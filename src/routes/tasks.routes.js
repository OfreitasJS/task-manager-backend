const express = require("express")
const router = express.Router()

const {
  listTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/tasks.controller")

router.get("/tasks", listTasks)
router.post("/tasks", createTask)
router.put("/tasks/:id", updateTask)
router.delete("/tasks/:id", deleteTask)

module.exports = router
