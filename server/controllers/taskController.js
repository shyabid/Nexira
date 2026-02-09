const { ObjectId } = require("mongodb");
const { getTasksCollection } = require("../db.js");

// ================= POST TASK =================
const postTask = async (req, res) => {
  try {
    const tasksCollection = await getTasksCollection();

    const { job_id, accepted_user_email, accepted_user_name } = req.body;

    if (!job_id || !accepted_user_email || !accepted_user_name) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: job_id, accepted_user_email, accepted_user_name",
      });
    }

    const newTask = {
      job_id,
      accepted_user_email,
      accepted_user_name,
      created_at: new Date(),
    };

    const result = await tasksCollection.insertOne(newTask);

    res.status(201).json({
      success: true,
      message: "Task posted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("postTask error:", error);
    res.status(500).json({
      success: false,
      message: "Task post failed",
    });
  }
};

// ================= GET USER TASKS =================
const getUserTasks = async (req, res) => {
  try {
    const tasksCollection = await getTasksCollection();
    const { email } = req.query;

    if (!email || email !== req.token_email) {
      return res.status(403).json({
        success: false,
        message: "Forbidden Access",
      });
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
            $cond: [
              { $eq: [{ $type: "$job_id" }, "objectId"] },
              "$job_id",
              {
                $convert: {
                  input: "$job_id",
                  to: "objectId",
                  onError: null,
                  onNull: null,
                },
              },
            ],
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
      {
        $unwind: {
          path: "$job_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          accepted_user_name: 1,
          accepted_user_email: 1,
          job_details: 1,
        },
      },
    ];

    const result = await tasksCollection.aggregate(pipeline).toArray();

    res.json({
      success: true,
      message: "Task jobs data retrieved successfully",
      user_tasks: result || [],
    });
  } catch (error) {
    console.error("getUserTasks error:", error);
    res.status(500).json({
      success: false,
      message: "Task jobs data retrieval failed",
    });
  }
};

// ================= DELETE TASK =================
const deleteTaskById = async (req, res) => {
  try {
    const tasksCollection = await getTasksCollection();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    const query = { _id: new ObjectId(id) };
    const result = await tasksCollection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

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

module.exports = {
  postTask,
  getUserTasks,
  deleteTaskById,
};
