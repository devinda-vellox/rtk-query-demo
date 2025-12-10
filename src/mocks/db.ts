import type { Todo } from "@/features/todos/types"

// In-memory database with seeded todos
let todos: Todo[] = [
  { id: "1", text: "Learn Redux Toolkit", completed: true },
  { id: "2", text: "Set up MSW for API mocking", completed: false },
  { id: "3", text: "Build a todo app", completed: false },
]

let nextId = 4

export const db = {
  todos: {
    getAll: () => [...todos],

    getById: (id: string) => todos.find((todo) => todo.id === id),

    create: (text: string): Todo => {
      const newTodo: Todo = {
        id: String(nextId++),
        text,
        completed: false,
      }
      todos.push(newTodo)
      return newTodo
    },

    toggle: (id: string): Todo | undefined => {
      const todo = todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
      return todo
    },

    delete: (id: string): boolean => {
      const index = todos.findIndex((t) => t.id === id)
      if (index !== -1) {
        todos.splice(index, 1)
        return true
      }
      return false
    },
  },
}
