const express = require("express");

const verifyTokenId = require("../middlewares/verifyTokenId.js");
const { getDashboardStats } = require("../controllers/dashboardController.js");

const dashboardRouter = express.Router();

// 🔐 Single, reliable auth middleware
dashboardRouter.use(verifyTokenId);

// 📊 Dashboard stats
dashboardRouter.get("/stats", getDashboardStats);

module.exports = dashboardRouter;
