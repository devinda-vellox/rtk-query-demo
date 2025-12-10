import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Todo } from "./types"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}
