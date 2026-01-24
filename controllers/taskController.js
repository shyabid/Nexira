const { ObjectId } = require("mongodb");
const { tasksCollection } = require("../db.js");

// ================= POST TASK =================
const postTask = async (req, res) => {
  try {
    const newTask = {
      ...req.body,
      created_at: new Date(), // ✅ date safe
    };

    const result = await tasksCollection.insertOne(newTask);

    res.send({
      success: true,
      message: "Task posted successfully",
      ...result,
    });
  } catch (error) {
    console.error("postTask error:", error);
    res.status(500).send({
      success: false,
      message: "Task post failed",
    });
  }
};

// ================= GET USER TASKS =================
const getUserTasks = async (req, res) => {
  try {
    const { email } = req.query;

    // 🔐 Auth safety (frontend break করবে না)
    if (!email || email !== req.token_email) {
      return res.status(403).send({
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
        // 🛡️ Safe ObjectId conversion (crash fix)
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
        // 🛡️ Unwind safe (no crash if missing job)
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

    res.send({
      success: true,
      message: "Task jobs data retrieved successfully",
      user_tasks: result || [],
    });
  } catch (error) {
    console.error("getUserTasks error:", error);
    res.status(500).send({
      success: false,
      message: "Task jobs data retrieved failed",
    });
  }
};

// ================= DELETE TASK =================
const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🛡️ ObjectId validation (serverless safe)
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid task id",
      });
    }

    const query = { _id: new ObjectId(id) };
    const result = await tasksCollection.deleteOne(query);

    res.send({
      success: true,
      message: "Task deleted successfully",
      ...result,
    });
  } catch (error) {
    console.error("deleteTaskById error:", error);
    res.status(500).send({
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
