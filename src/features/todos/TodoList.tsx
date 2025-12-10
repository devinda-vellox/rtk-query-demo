import { useState } from "react"
import { AddTodo } from "./AddTodo"
import { TodoItem } from "./TodoItem"
import type { Todo } from "./types"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Todo App</h1>
      <AddTodo onAdd={addTodo} />
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
      {todos.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {todos.filter((t) => !t.completed).length} of {todos.length} remaining
        </p>
      )}
    </div>
  )
}
