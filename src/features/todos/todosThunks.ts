import type { AppDispatch } from "@/store"
import {
  setLoading,
  setTodos,
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  setError,
} from "./todosSlice"

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading())
  try {
    const response = await fetch("/api/todos")
    if (!response.ok) {
      throw new Error("Failed to fetch todos")
    }
    const data = await response.json()
    dispatch(setTodos(data))
  } catch (err) {
    dispatch(setError(err instanceof Error ? err.message : "Unknown error"))
  }
}

export const createTodo = (text: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
    if (!response.ok) {
      throw new Error("Failed to create todo")
    }
    const newTodo = await response.json()
    dispatch(addTodoSuccess(newTodo))
  } catch (err) {
    dispatch(setError(err instanceof Error ? err.message : "Unknown error"))
  }
}

export const toggleTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
    })
    if (!response.ok) {
      throw new Error("Failed to toggle todo")
    }
    dispatch(toggleTodoSuccess(id))
  } catch (err) {
    dispatch(setError(err instanceof Error ? err.message : "Unknown error"))
  }
}

export const deleteTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete todo")
    }
    dispatch(deleteTodoSuccess(id))
  } catch (err) {
    dispatch(setError(err instanceof Error ? err.message : "Unknown error"))
  }
}
