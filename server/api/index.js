const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const { connectDB } = require("../db");

const jobRouter = require("../routes/jobRouter");
const taskRouter = require("../routes/taskRouter");
const dashboardRouter = require("../routes/dashboardRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running on Vercel");
});

app.use("/jobs", jobRouter);
app.use("/added-tasks", taskRouter);
app.use("/dashboard", dashboardRouter);

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};
