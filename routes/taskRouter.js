const express = require("express");
const {
  postTask,
  getUserTasks,
  deleteTaskById,
} = require("../controllers/taskController");

const verifyTokenId = require("../middlewares/verifyTokenId");

const taskRouter = express.Router();

// protect all task routes
taskRouter.use(verifyTokenId);

taskRouter.post("/", postTask);
taskRouter.get("/user", getUserTasks);
taskRouter.delete("/:id", deleteTaskById);

module.exports = taskRouter;
