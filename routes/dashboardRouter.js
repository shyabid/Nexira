const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");

const verifyTokenId = require("../middlewares/verifyTokenId");

const dashboardRouter = express.Router();

// protect all dashboard routes
dashboardRouter.use(verifyTokenId);

dashboardRouter.get("/stats", getDashboardStats);

module.exports = dashboardRouter;
