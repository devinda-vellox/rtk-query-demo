import { http, HttpResponse, delay } from "msw"
import { db } from "./db"
import { mockConfig } from "./config"

function log(method: string, path: string, status: number, duration: number) {
  const timestamp = new Date().toISOString()
  const statusColor = status >= 400 ? "\x1b[31m" : "\x1b[32m"
  const reset = "\x1b[0m"
  console.log(
    `[MSW] ${timestamp} ${method} ${path} - ${statusColor}${status}${reset} (${duration}ms)`
  )
}

function shouldFail(): boolean {
  return Math.random() * 100 < mockConfig.errorRate
}

function simulatedError(method: string, path: string, start: number) {
  const duration = Math.round(performance.now() - start)
  log(method, path, 500, duration)
  return HttpResponse.json(
    { error: "Internal server error (simulated)" },
    { status: 500 }
  )
}

export const handlers = [
  // GET /api/todos - Fetch all todos
  http.get("/api/todos", async () => {
    const start = performance.now()

    if (shouldFail()) {
      await delay(mockConfig.latency)
      return simulatedError("GET", "/api/todos", start)
    }

    const todos = db.todos.getAll()
    await delay(mockConfig.latency)
    const duration = Math.round(performance.now() - start)
    log("GET", "/api/todos", 200, duration)
    return HttpResponse.json(todos)
  }),

  // POST /api/todos - Create a new todo
  http.post("/api/todos", async ({ request }) => {
    const start = performance.now()

    if (shouldFail()) {
      await delay(mockConfig.latency)
      return simulatedError("POST", "/api/todos", start)
    }

    const body = (await request.json()) as { text: string }

    if (!body.text?.trim()) {
      await delay(mockConfig.latency)
      const duration = Math.round(performance.now() - start)
      log("POST", "/api/todos", 400, duration)
      return HttpResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    const newTodo = db.todos.create(body.text.trim())
    await delay(mockConfig.latency)
    const duration = Math.round(performance.now() - start)
    log("POST", "/api/todos", 201, duration)
    return HttpResponse.json(newTodo, { status: 201 })
  }),

  // PATCH /api/todos/:id - Toggle todo completion
  http.patch("/api/todos/:id", async ({ params }) => {
    const start = performance.now()
    const { id } = params as { id: string }
    const path = `/api/todos/${id}`

    if (shouldFail()) {
      await delay(mockConfig.latency)
      return simulatedError("PATCH", path, start)
    }

    const todo = db.todos.toggle(id)
    if (!todo) {
      await delay(mockConfig.latency)
      const duration = Math.round(performance.now() - start)
      log("PATCH", path, 404, duration)
      return HttpResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      )
    }

    await delay(mockConfig.latency)
    const duration = Math.round(performance.now() - start)
    log("PATCH", path, 200, duration)
    return HttpResponse.json(todo)
  }),

  // DELETE /api/todos/:id - Delete a todo
  http.delete("/api/todos/:id", async ({ params }) => {
    const start = performance.now()
    const { id } = params as { id: string }
    const path = `/api/todos/${id}`

    if (shouldFail()) {
      await delay(mockConfig.latency)
      return simulatedError("DELETE", path, start)
    }

    const deleted = db.todos.delete(id)
    if (!deleted) {
      await delay(mockConfig.latency)
      const duration = Math.round(performance.now() - start)
      log("DELETE", path, 404, duration)
      return HttpResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      )
    }

    await delay(mockConfig.latency)
    const duration = Math.round(performance.now() - start)
    log("DELETE", path, 200, duration)
    return HttpResponse.json({ success: true })
  }),
]
