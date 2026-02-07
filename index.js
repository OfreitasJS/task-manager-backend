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