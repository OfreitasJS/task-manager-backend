const express = require("express")
const tasksRoutes = require("./routes/tasks.routes")


const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend Task Manager rodando !")
})

app.use(tasksRoutes)

module.exports = app
