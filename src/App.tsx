import { TodoList } from "./features/todos/TodoList"
import { DevTools } from "./components/DevTools"

function App() {
  return (
    <main className="min-h-screen p-8">
      <DevTools />
      <TodoList />
    </main>
  )
}

export default App
