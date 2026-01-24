const express = require("express");
const {
  postTask,
  getUserTasks,
  deleteTaskById,
} = require("../controllers/taskController.js");

const verifyTokenId = require("../middlewares/verifyTokenId.js");

const taskRouter = express.Router();

// 🔐 All task routes are protected
taskRouter.use(verifyTokenId);

// ➕ Post a task
taskRouter.post("/", postTask);

// 📄 Get user tasks
taskRouter.get("/user", getUserTasks);

// ❌ Delete a task
taskRouter.delete("/:id", deleteTaskById);

module.exports = taskRouter;
