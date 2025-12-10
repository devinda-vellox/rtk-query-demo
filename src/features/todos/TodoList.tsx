import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AddTodo } from "./AddTodo"
import { TodoItem } from "./TodoItem"
import {
  selectTodos,
  selectTodosStatus,
  selectTodosError,
  selectTodoCount,
  selectRemainingCount,
} from "./todosSlice"
import { fetchTodos } from "./todosThunks"

export function TodoList() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
  const status = useAppSelector(selectTodosStatus)
  const error = useAppSelector(selectTodosError)
  const todoCount = useAppSelector(selectTodoCount)
  const remainingCount = useAppSelector(selectRemainingCount)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos())
    }
  }, [status, dispatch])

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Todo App</h1>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      <AddTodo />

      <div className="space-y-2">
        {status === "loading" && todoCount === 0 ? (
          <div className="flex justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : todoCount === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>

      {todoCount > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {remainingCount} of {todoCount} remaining
        </p>
      )}

      <div className="text-center">
        <Button variant="ghost" size="sm" onClick={() => dispatch(fetchTodos())}>
          Reload Todos
        </Button>
      </div>
    </div>
  )
}
