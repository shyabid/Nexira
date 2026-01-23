require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const { connectDB } = require("./db.js");

const jobRouter = require("./routes/jobRouter");
const taskRouter = require("./routes/taskRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Server running");
});

// routes
app.use("/jobs", jobRouter);
app.use("/added-tasks", taskRouter);
app.use("/dashboard", dashboardRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// start server only after DB connected
const startServer = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URI); // optional

    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
