import { useAppSelector } from "@/store/hooks"
import { AddTodo } from "./AddTodo"
import { TodoItem } from "./TodoItem"
import {
  selectTodos,
  selectTodoCount,
  selectRemainingCount,
} from "./todosSlice"

export function TodoList() {
  const todos = useAppSelector(selectTodos)
  const todoCount = useAppSelector(selectTodoCount)
  const remainingCount = useAppSelector(selectRemainingCount)

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Todo App</h1>
      <AddTodo />
      <div className="space-y-2">
        {todoCount === 0 ? (
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
    </div>
  )
}
