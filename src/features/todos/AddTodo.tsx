import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddTodoProps {
  onAdd: (text: string) => void
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      onAdd(trimmed)
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit" disabled={!text.trim()}>
        <Plus className="size-4" />
        Add
      </Button>
    </form>
  )
}
