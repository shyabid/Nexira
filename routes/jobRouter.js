const express = require("express");
const {
  getJobs,
  postJob,
  getJobById,
  getUserJobs,
} = require("../controllers/jobController");

const verifyTokenId = require("../middlewares/verifyTokenId");

const jobRouter = express.Router();

// public
jobRouter.get("/", getJobs);
jobRouter.get("/:id", getJobById);

// protected
jobRouter.get("/user", verifyTokenId, getUserJobs);
jobRouter.post("/", verifyTokenId, postJob);

module.exports = jobRouter;
