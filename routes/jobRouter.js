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

// protected (STATIC routes first)
jobRouter.get("/user", verifyTokenId, getUserJobs);
jobRouter.post("/", verifyTokenId, postJob);

// dynamic route LAST
jobRouter.get("/:id", getJobById);

module.exports = jobRouter;
