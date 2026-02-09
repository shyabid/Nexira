import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { FaRegCircleXmark } from "react-icons/fa6";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import FetchSpinner from "../../../components/ui/FetchSpinner/FetchSpinner";
import DataNotFound from "../../../components/ui/DataNotFound/DataNotFound";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import { getAlert } from "../../../utilities/getAlert";

const MyAcceptedTasksPage = () => {
  const [taskLoading, setTaskLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setTaskLoading(true);

      try {
        const { data } = await secureAxios.get("/added-tasks/user", {
          params: {
            email: currentUser.email,
          },
        });

        if (data.success) {
          setTasks(data.user_tasks);
        }
      } finally {
        setTaskLoading(false);
      }
    })();
  }, [secureAxios, currentUser.email]);

  const handleCompleteTask = async (taskId, jobId) => {
    try {
      const { data } = await secureAxios.put(`/jobs/${jobId}`, {
        status: "completed",
      });

      if (data.success) {
        const { data } = await secureAxios.delete(`/added-tasks/${taskId}`);

        if (data.success) {
          const updated = tasks.filter((item) => item._id !== taskId);
          setTasks(updated);

          getAlert({
            title: "Task completed successfully",
          });
        }
      }
    } catch {
      toast.error("Task complete failed");
    }
  };

  const handleTerminateTask = async (id) => {
    try {
      const { data } = await secureAxios.delete(`/added-tasks/${id}`);
      if (data.success) {
        const updated = tasks.filter((item) => item._id !== id);
        setTasks(updated);
        getAlert({
          title: "Task terminated successfully",
        });
      }
    } catch {
      toast.error("Task terminated failed");
    }
  };

  if (taskLoading) {
    return <FetchSpinner />;
  }

  return (
    <>
      <title>My Accepted Tasks - Nexira</title>

      <motion.section
        className="my-6 py-8"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
      >
        <MyContainer className="space-y-7">
          {tasks.length === 0 ? (
            <DataNotFound value="jobs">
              You have not yet accepted any job offers.
            </DataNotFound>
          ) : (
            <>
              <MyTitle>My Accepted Tasks</MyTitle>
              <div className="overflow-x-auto">
                <table className="table rounded-lg overflow-hidden  shadow-lg bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/15  dark:to-secondary/15">
                  <thead className="text-neutral dark:text-white/90 bg-info/5 dark:bg-info/15 md:text-lg">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Job Name</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="md:text-base">
                    {tasks.map((item, index) => (
                      <tr key={item._id}>
                        <td className="text-neutral dark:text-white/90">
                          {index + 1}
                        </td>
                        <td>
                          <img
                            src={item.job_details.job_image}
                            alt={item.job_details.job_title}
                            className="w-16 h-10 rounded-md object-cover overflow-hidden"
                          />
                        </td>
                        <td className="min-w-[200px]">
                          {item.job_details.job_title}
                        </td>
                        <td className="text-nowrap">
                          {item.job_details.job_category}
                        </td>
                        <td className="space-x-1.5 text-nowrap">
                          <button
                            onClick={() =>
                              navigate(`/job-details/${item.job_details._id}`)
                            }
                            title="View"
                            className="btn shadow-none border-none bg-transparent p-1.5 text-2xl text-info"
                          >
                            <VscEye />
                          </button>

                          <button
                            title="Done"
                            onClick={() =>
                              handleCompleteTask(item._id, item.job_details._id)
                            }
                            className="btn shadow-none border-none bg-transparent p-1.5 text-xl text-success"
                          >
                            <FaRegCheckCircle />
                          </button>

                          <button
                            title="Terminate"
                            onClick={() => handleTerminateTask(item._id)}
                            className="btn shadow-none border-none bg-transparent p-1.5 text-xl text-error"
                          >
                            <FaRegCircleXmark />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </MyContainer>
      </motion.section>
    </>
  );
};

export default MyAcceptedTasksPage;
