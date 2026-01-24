const express = require("express");
const {
  getJobs,
  postJob,
  updateJobById,
  deleteJobById,
  getJobById,
  getUserJobs,
} = require("../controllers/jobController");

const verifyTokenId = require("../middlewares/verifyTokenId");

const jobRouter = express.Router();

// 🌍 Public routes
jobRouter.get("/", getJobs);
jobRouter.get("/:id", getJobById);

// 🔐 Protected routes
jobRouter.get("/user", verifyTokenId, getUserJobs);
jobRouter.post("/", verifyTokenId, postJob);
jobRouter.put("/:id", verifyTokenId, updateJobById);
jobRouter.delete("/:id", verifyTokenId, deleteJobById);

module.exports = jobRouter;
