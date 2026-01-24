const { ObjectId } = require("mongodb");
const { getJobsCollection } = require("../db");

// ================= GET ALL JOBS =================
const getJobs = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();

    let query = {};
    let sortObj = {};
    let projectField = {};

    const {
      search,
      job_category,
      job_type,
      location,
      experience_level,
      sortBy = "created_at",
      sortOrder = "desc",
      page = 1,
      limit = 12,
      fields,
      excludes,
    } = req.query;

    // Pagination
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 12));
    const skipNum = (pageNum - 1) * limitNum;

    // Sorting
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Search
    if (search?.trim()) {
      const regex = { $regex: search.trim(), $options: "i" };
      query.$or = [
        { job_title: regex },
        { job_summary: regex },
        { posted_by: regex },
      ];
    }

    // Filters
    if (job_category?.trim()) query.job_category = job_category.trim();
    if (job_type?.trim()) query.job_type = job_type.trim();
    if (experience_level?.trim())
      query.experience_level = experience_level.trim();
    if (location?.trim())
      query.location = { $regex: location.trim(), $options: "i" };

    // Projection include
    if (fields?.trim()) {
      fields.split(",").forEach((f) => (projectField[f.trim()] = 1));
    }

    // Projection exclude
    if (excludes?.trim()) {
      excludes.split(",").forEach((f) => (projectField[f.trim()] = 0));
    }

    // Default projection
    if (!Object.keys(projectField).length) {
      projectField = {
        creator_email: 0,
        requirements: 0,
        responsibilities: 0,
        benefits: 0,
        company_description: 0,
      };
    }

    const total = await jobsCollection.countDocuments(query);

    const jobs = await jobsCollection
      .find(query)
      .sort(sortObj)
      .skip(skipNum)
      .limit(limitNum)
      .project(projectField)
      .toArray();

    res.status(200).json({
      success: true,
      jobs: jobs || [],
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalJobs: total,
      },
    });
  } catch (error) {
    console.error("getJobs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve jobs",
    });
  }
};

// ================= GET USER JOBS =================
const getUserJobs = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();
    const email = req.query.email;

    if (!email || email !== req.token_email) {
      return res.status(403).json({ message: "Forbidden Access" });
    }

    const result = await jobsCollection
      .find({ creator_email: email })
      .toArray();

    res.json({
      success: true,
      user_jobs: result || [],
    });
  } catch (error) {
    console.error("getUserJobs error:", error);
    res.status(500).json({ success: false });
  }
};

// ================= POST JOB =================
const postJob = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();

    const newJob = {
      ...req.body,
      creator_email: req.token_email,
      created_at: new Date(),
      status: "pending",
    };

    const result = await jobsCollection.insertOne(newJob);

    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("postJob error:", error);
    res.status(500).json({ success: false });
  }
};

// ================= GET JOB BY ID =================
const getJobById = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const job = await jobsCollection.findOne({
      _id: new ObjectId(id),
    });

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("getJobById error:", error);
    res.status(500).json({ success: false });
  }
};

// ================= UPDATE JOB =================
const updateJobById = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const updateData = req.body;

    const result = await jobsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    res.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("updateJobById error:", error);
    res.status(500).json({ success: false });
  }
};

// ================= DELETE JOB =================
const deleteJobById = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job id" });
    }

    const result = await jobsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("deleteJobById error:", error);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  getJobs,
  getUserJobs,
  postJob,
  getJobById,
  updateJobById,
  deleteJobById,
};
