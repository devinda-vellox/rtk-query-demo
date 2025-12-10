import { createSlice, nanoid } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "./types"

interface TodosState {
  items: Todo[]
}

const initialState: TodosState = {
  items: [],
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload)
      },
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
  selectors: {
    selectTodos: (state) => state.items,
    selectTodoCount: (state) => state.items.length,
    selectRemainingCount: (state) =>
      state.items.filter((item) => !item.completed).length,
  },
})

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions
export const { selectTodos, selectTodoCount, selectRemainingCount } =
  todosSlice.selectors
export default todosSlice.reducer
