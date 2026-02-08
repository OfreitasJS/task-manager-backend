const tasks = require("../database/tasks.db")

function listTasks(req, res) {
  return res.status(200).json({
    total: tasks.length,
    tasks
  })
}

function createTask(req, res) {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ error: "Title is required" })
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  }

  tasks.push(newTask)

  return res.status(201).json(newTask)
}

function updateTask(req, res) {
  const id = Number(req.params.id)
  const { title, completed } = req.body

  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return res.status(404).json({ error: "Task not found" })
  }

  if (title !== undefined) {
    if (title === "") {
      return res.status(400).json({ error: "Title cannot be empty" })
    }
    task.title = title
  }

  if (completed !== undefined) {
    task.completed = Boolean(completed)
  }

  return res.status(200).json(task)
}

function deleteTask(req, res) {
  const id = Number(req.params.id)

  const index = tasks.findIndex((t) => t.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" })
  }

  const removedTask = tasks.splice(index, 1)[0]

  return res.status(200).json({
    message: "Task removed successfully",
    removedTask
  })
}

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask
}
