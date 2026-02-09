const { getJobsCollection } = require("../db.js");

const getDashboardStats = async (req, res) => {
  try {
    const jobsCollection = await getJobsCollection();

    const userEmail = req.token_email || null;
    const { my_jobs_only = "false" } = req.query;
    const isMyJobsOnly = my_jobs_only === "true";

    // 🎯 Match stage
    const matchStage =
      isMyJobsOnly && userEmail ? { creator_email: userEmail } : {};

    // 📅 Last 30 days (Date only)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const stats = await jobsCollection
      .aggregate([
        { $match: matchStage },
        {
          $facet: {
            // ===== STATUS BREAKDOWN =====
            statusBreakdown: [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 },
                },
              },
              {
                $group: {
                  _id: null,
                  items: { $push: "$$ROOT" },
                },
              },
              {
                $project: {
                  breakdown: {
                    pending: {
                      $ifNull: [
                        {
                          $first: {
                            $filter: {
                              input: "$items",
                              cond: { $eq: ["$$this._id", "pending"] },
                            },
                          },
                        },
                        { count: 0 },
                      ],
                    },
                    accepted: {
                      $ifNull: [
                        {
                          $first: {
                            $filter: {
                              input: "$items",
                              cond: { $eq: ["$$this._id", "accepted"] },
                            },
                          },
                        },
                        { count: 0 },
                      ],
                    },
                    completed: {
                      $ifNull: [
                        {
                          $first: {
                            $filter: {
                              input: "$items",
                              cond: { $eq: ["$$this._id", "completed"] },
                            },
                          },
                        },
                        { count: 0 },
                      ],
                    },
                    total: { $sum: "$items.count" },
                  },
                },
              },
            ],

            // ===== JOBS OVER TIME =====
            jobsOverTime: [
              { $match: { created_at: { $gte: thirtyDaysAgo } } },
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$created_at",
                    },
                  },
                  count: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
              {
                $project: {
                  date: "$_id",
                  count: 1,
                  _id: 0,
                },
              },
            ],

            // ===== TOP CATEGORIES =====
            topCategories: [
              { $group: { _id: "$job_category", count: { $sum: 1 } } },
              { $sort: { count: -1 } },
              { $limit: 6 },
              {
                $project: {
                  category: "$_id",
                  count: 1,
                  _id: 0,
                },
              },
            ],

            // ===== JOB TYPES =====
            jobTypes: [
              { $group: { _id: "$job_type", count: { $sum: 1 } } },
              {
                $project: {
                  type: "$_id",
                  count: 1,
                  _id: 0,
                },
              },
            ],

            // ===== EXPERIENCE LEVELS =====
            experienceLevels: [
              {
                $group: {
                  _id: "$experience_level",
                  count: { $sum: 1 },
                },
              },
              {
                $project: {
                  level: "$_id",
                  count: 1,
                  _id: 0,
                },
              },
            ],
          },
        },
      ])
      .toArray();

    const result = stats[0] || {};
    const breakdown = result.statusBreakdown?.[0]?.breakdown || {
      pending: { count: 0 },
      accepted: { count: 0 },
      completed: { count: 0 },
      total: 0,
    };

    // ✅ RESPONSE (frontend-safe)
    res.status(200).send({
      success: true,
      message: "Dashboard statistics retrieved successfully",
      data: {
        totalJobs: breakdown.total || 0,
        statusBreakdown: {
          pending: breakdown.pending?.count || 0,
          accepted: breakdown.accepted?.count || 0,
          completed: breakdown.completed?.count || 0,
        },
        jobsOverTime: result.jobsOverTime || [],
        topCategories: result.topCategories || [],
        jobTypes: result.jobTypes || [],
        experienceLevels: result.experienceLevels || [],
      },
      meta: {
        filteredByUser: isMyJobsOnly,
        periodDays: 30,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to retrieve dashboard statistics",
    });
  }
};

module.exports = { getDashboardStats };
