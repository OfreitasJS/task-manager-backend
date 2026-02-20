import { useEffect, useState } from "react"
import { getTasks } from "./services/api"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [creating, setCreating] = useState(false)

  async function loadTasks() {
    try {
      setError("")
      setLoading(true)
      const data = await getTasks()
      setTasks(data.tasks)
    } catch (err) {
      setError(err.message || "Erro")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleCreateTask(e) {
  e.preventDefault()

  if (!title.trim()) return

  try {
    setCreating(true)

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })

    if (!response.ok) {
      throw new Error("Erro ao criar task")
    }

    setTitle("")
    await loadTasks()
  } catch (err) {
    setError(err.message)
  } finally {
    setCreating(false)
  }
}

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

      <form onSubmit={handleCreateTask} style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" disabled={creating} style={{ padding: "10px 14px" }}>
          {creating ? "Saving..." : "Add"}
        </button>
      </form>

      {loading && <p>Carregando...</p>}

      {error && (
        <p>
          <strong>Erro:</strong> {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {tasks.length === 0 ? (
            <p>Sem tarefas ainda.</p>
          ) : (
            <ul>
              {tasks.map((t) => (
                <li key={t.id}>{t.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}