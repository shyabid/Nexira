const { ObjectId } = require("mongodb");
const { getTasksCollection } = require("../db");

const postTask = async (req, res) => {
  const tasksCollection = getTasksCollection();
  const newTask = req.body;

  // security: task must belong to logged-in user
  if (newTask.accepted_user_email !== req.token_email) {
    return res.status(403).json({ message: "Forbidden Access" });
  }

  try {
    const result = await tasksCollection.insertOne({
      ...newTask,
      created_at: new Date(),
    });

    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("postTask error:", error);
    res.status(500).json({ success: false, message: "Task post failed" });
  }
};

const getUserTasks = async (req, res) => {
  const tasksCollection = getTasksCollection();
  const { email } = req.query;

  if (email !== req.token_email) {
    return res.status(403).json({ message: "Forbidden Access" });
  }

  const pipeline = [
    {
      $match: {
        accepted_user_email: email,
      },
    },
    {
      $addFields: {
        jobObjId: {
          $convert: {
            input: "$job_id",
            to: "objectId",
            onError: null,
            onNull: null,
          },
        },
      },
    },
    {
      $lookup: {
        from: "all_jobs",
        localField: "jobObjId",
        foreignField: "_id",
        as: "job_details",
      },
    },
    { $unwind: "$job_details" },
    {
      $project: {
        accepted_user_name: 1,
        accepted_user_email: 1,
        job_details: 1,
      },
    },
  ];

  try {
    const result = await tasksCollection.aggregate(pipeline).toArray();

    res.json({
      success: true,
      user_tasks: result,
    });
  } catch (error) {
    console.error("getUserTasks error:", error);
    res.status(500).json({
      success: false,
      message: "Task jobs data retrieved failed",
    });
  }
};

const deleteTaskById = async (req, res) => {
  const tasksCollection = getTasksCollection();
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  try {
    const task = await tasksCollection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.accepted_user_email !== req.token_email) {
      return res.status(403).json({ message: "Forbidden Access" });
    }

    await tasksCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("deleteTaskById error:", error);
    res.status(500).json({
      success: false,
      message: "Task delete failed",
    });
  }
};

module.exports = { postTask, getUserTasks, deleteTaskById };
