const express = require("express")
const app = express()


app.use(express.json())
const tasks = []


app.get("/tasks", (req, res) => {
    res.status(200).json({
        total: tasks.length,
        tasks: tasks
    })
})

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id)

  const taskIndex = tasks.findIndex((t) => t.id === id)   //LOCALIZA A POSIÇÃO DA TASK NO ARRAY//

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" })
  }

  const removedTask = tasks.splice(taskIndex, 1)[0] //REMOVE 1 1ITEM DO ARRAY NAQUELA POSIÇÃO//

  return res.status(200).json({
    message: "Task removed successfully",
    removedTask
  })
})


app.get("/", (req, res) => {
  res.send("Backend Task Manager rodando")
})

app.post("/tasks", (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({
      error: "Title is required"
    })
  }

  const newTask = {
    id: tasks.length + 1,
    title: title,
    completed: false
  }

  tasks.push(newTask)

  return res.status(201).json(newTask)
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})