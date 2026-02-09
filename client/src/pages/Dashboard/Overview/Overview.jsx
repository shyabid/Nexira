import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import {
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineFolder,
} from "react-icons/hi";
import { format, subDays } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyButton from "../../../components/ui/MyButton/MyButton";
import { useNavigate } from "react-router";
import FetchSpinner from "../../../components/ui/FetchSpinner/FetchSpinner";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Overview = () => {
  const secureAxios = useSecureAxios();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await secureAxios.get("/dashboard/stats", {
          params: { my_jobs_only: true },
        });
        setStats(res.data.data);
      } catch (err) {
        setError("Failed to load dashboard statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [secureAxios]);

  // GSAP Number Counter Animation (clean & reliable)
  useEffect(() => {
    if (!stats || loading) return;

    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const targetValue = parseInt(counter.dataset.target, 10) || 0;

      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 1.8,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            counter.innerText = Math.ceil(
              this.targets()[0].innerText,
            ).toLocaleString();
          },
        },
      );
    });
  }, [stats, loading]);

  if (loading) {
    return (
      <>
        <section>
          <MyContainer>
            <FetchSpinner className="min-h-[60dvh]" />
          </MyContainer>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <MyContainer>
        <div className="alert alert-error shadow-lg max-w-md mx-auto">
          <span>{error}</span>
        </div>
      </MyContainer>
    );
  }

  const totalJobs = stats.totalJobs || 0;

  // Prepare last 7 days data with fallbacks
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const dateStr = format(date, "yyyy-MM-dd");
    const found = stats.jobsOverTime.find((d) => d.date === dateStr);
    return {
      date: format(date, "MMM dd"),
      jobs: found ? found.count : 0,
    };
  });

  const statusData = [
    {
      name: "Pending",
      value: stats.statusBreakdown.pending || 0,
      color: "warning",
    },
    {
      name: "Accepted",
      value: stats.statusBreakdown.accepted || 0,
      color: "success",
    },
    {
      name: "Completed",
      value: stats.statusBreakdown.completed || 0,
      color: "info",
    },
  ];

  return (
    <>
      <title>Dashboard Overview | Nexira</title>
      <section>
        <MyContainer className="py-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold mb-6 text-base-content dark:text-white"
          >
            Dashboard Overview
          </motion.h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                title: "Total Jobs",
                value: totalJobs,
                icon: HiOutlineBriefcase,
                color: "text-primary",
              },
              {
                title: "Pending",
                value: stats.statusBreakdown.pending || 0,
                icon: HiOutlineClock,
                color: "text-warning",
              },
              {
                title: "Accepted",
                value: stats.statusBreakdown.accepted || 0,
                icon: HiOutlineFolder,
                color: "text-success",
              },
              {
                title: "Completed",
                value: stats.statusBreakdown.completed || 0,
                icon: HiOutlineCheckCircle,
                color: "text-info",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="card bg-base-200 dark:bg-gray-800 shadow-lg border border-base-300 dark:border-gray-700"
              >
                <div className="card-body p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/60 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p
                        className={`stat-number text-2xl font-bold ${stat.color}`}
                        data-target={stat.value}
                      >
                        0
                      </p>
                    </div>
                    <stat.icon className={`size-8 opacity-80 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Jobs Over Time - Fixed height issue */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="card bg-base-200 dark:bg-gray-800 shadow-lg border border-base-300 dark:border-gray-700 p-5"
            >
              <h2 className="text-lg font-semibold mb-4 text-base-content dark:text-white">
                Jobs Posted (Last 7 Days)
              </h2>
              <div className="w-full h-80">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <LineChart
                    data={last7Days}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis allowDecimals={false} stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#2fd4bf2b",
                        border: "1px solid hsl(var(--bc) / 0.2)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="jobs"
                      stroke="#01a9b4"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#086972" }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Status Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="card bg-base-200 dark:bg-gray-800 shadow-lg border border-base-300 dark:border-gray-700 p-5"
            >
              <h2 className="text-lg font-semibold mb-4 text-base-content dark:text-white">
                Job Status Distribution
              </h2>

              <div className="space-y-5">
                {statusData.map((item) => {
                  const percentage =
                    totalJobs > 0
                      ? Math.round((item.value / totalJobs) * 100)
                      : 0;
                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full bg-${item.color}`}
                          />
                          {item.name}
                        </span>
                        <span className="font-medium">
                          {item.value} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-base-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                          className={`h-full bg-${item.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold mb-4 text-base-content dark:text-white">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <MyButton onClick={() => navigate("add-job")}>
                Add New Job
              </MyButton>
              <button
                onClick={() => navigate("/all-jobs")}
                className="btn btn-outline btn-sm md:btn-md"
              >
                View All Jobs
              </button>
              <button
                onClick={() => navigate("profile")}
                className="btn btn-outline btn-sm md:btn-md"
              >
                Update Profile
              </button>
            </div>
          </motion.div>
        </MyContainer>
      </section>
    </>
  );
};

export default Overview;
