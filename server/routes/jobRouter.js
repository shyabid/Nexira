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

// 🔐 Protected routes (must be before /:id to avoid matching "user" as an id)
jobRouter.get("/user", verifyTokenId, getUserJobs);

// 🌍 Public dynamic route
jobRouter.get("/:id", getJobById);
jobRouter.post("/", verifyTokenId, postJob);
jobRouter.put("/:id", verifyTokenId, updateJobById);
jobRouter.delete("/:id", verifyTokenId, deleteJobById);

module.exports = jobRouter;
