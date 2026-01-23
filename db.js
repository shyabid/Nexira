const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

console.log("Mongo URI:", uri);

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;
let jobsCollection;
let tasksCollection;

const connectDB = async () => {
  try {
    await client.connect(); // ✅ NO argument
    database = client.db("Nexira-db");

    jobsCollection = database.collection("all_jobs");
    tasksCollection = database.collection("added_tasks");

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};

const getJobsCollection = () => jobsCollection;
const getTasksCollection = () => tasksCollection;

module.exports = {
  connectDB,
  getJobsCollection,
  getTasksCollection,
};
