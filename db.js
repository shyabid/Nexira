const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is missing");
  throw new Error("MONGODB_URI is missing");
}

// 🔁 Cache for serverless
let cachedClient = null;
let cachedDb = null;

const connectDB = async () => {
  // ✅ reuse existing connection
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const db = client.db(); // DB name comes from URI

  cachedClient = client;
  cachedDb = db;

  console.log("✅ MongoDB connected (serverless)");

  return db;
};

// helpers (optional)
const getJobsCollection = async () => {
  const db = await connectDB();
  return db.collection("all_jobs");
};

const getTasksCollection = async () => {
  const db = await connectDB();
  return db.collection("added_tasks");
};

module.exports = {
  connectDB,
  getJobsCollection,
  getTasksCollection,
};
