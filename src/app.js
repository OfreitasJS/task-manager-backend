const express = require("express")
const cors = require("cors")
const tasksRoutes = require("./routes/tasks.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend Task Manager rodando!")
})

app.use("/tasks", tasksRoutes)

module.exports = app
