import { useEffect, useState } from "react";
import { getTasks } from "./services/api"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);


  useEffect(() => {
    async function load() {
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

    load()
  }, [])

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

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
