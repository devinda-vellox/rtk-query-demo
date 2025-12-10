import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "./types"

interface TodosState {
  items: Todo[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TodosState = {
  items: [],
  status: "idle",
  error: null,
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading"
      state.error = null
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload
      state.status = "succeeded"
      state.error = null
    },
    addTodoSuccess: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload)
    },
    toggleTodoSuccess: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodoSuccess: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed"
      state.error = action.payload
    },
  },
  selectors: {
    selectTodos: (state) => state.items,
    selectTodosStatus: (state) => state.status,
    selectTodosError: (state) => state.error,
    selectTodoCount: (state) => state.items.length,
    selectRemainingCount: (state) =>
      state.items.filter((item) => !item.completed).length,
  },
})

export const {
  setLoading,
  setTodos,
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  setError,
} = todosSlice.actions

export const {
  selectTodos,
  selectTodosStatus,
  selectTodosError,
  selectTodoCount,
  selectRemainingCount,
} = todosSlice.selectors

export default todosSlice.reducer
