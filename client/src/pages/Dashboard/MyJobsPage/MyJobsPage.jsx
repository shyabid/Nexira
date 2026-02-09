import { useEffect, useState } from "react";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import FetchSpinner from "../../../components/ui/FetchSpinner/FetchSpinner";
import DataNotFound from "../../../components/ui/DataNotFound/DataNotFound";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const MyJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [userJobs, setUserJobs] = useState([]);
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await secureAxios.get("/jobs/user", {
          params: {
            email: currentUser.email,
          },
        });

        if (data.success) {
          setUserJobs(data.user_jobs);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [secureAxios, currentUser.email]);

  if (loading) {
    return <FetchSpinner />;
  }

  const handleDelete = async (id) => {
    const result = await mySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      mySwal.fire({
        title: "Deleting...",
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      try {
        mySwal.showLoading();
        const { data } = await secureAxios.delete(`/jobs/${id}`);

        if (data.success) {
          const updatedJobs = userJobs.filter((item) => item._id !== id);
          setUserJobs(updatedJobs);

          mySwal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch {
        toast.error("Job Data Delete Failed");
      } finally {
        mySwal.hideLoading();
        mySwal.close();
      }
    }
  };

  return (
    <>
      <title>My Added Jobs - Nexira</title>

      <motion.section
        className="my-6 py-8"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
      >
        <MyContainer className="space-y-7">
          {userJobs.length === 0 ? (
            <DataNotFound value="tasks">
              No job postings have been submitted yet.
            </DataNotFound>
          ) : (
            <>
              <MyTitle>My Added Jobs</MyTitle>

              <div className="overflow-x-auto">
                <table className="table rounded-lg overflow-hidden  shadow-lg bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/15  dark:to-secondary/15">
                  <thead className="text-neutral dark:text-white/90 bg-info/5 dark:bg-info/10 md:text-lg">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Job Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="md:text-base">
                    {userJobs.map((item, index) => (
                      <tr key={item._id}>
                        <td className="text-neutral dark:text-white/90">
                          {index + 1}
                        </td>
                        <td>
                          <img
                            src={item.job_image}
                            alt={item.job_title}
                            className="w-16 h-10 rounded-md object-cover overflow-hidden"
                          />
                        </td>
                        <td className="min-w-[200px]">{item.job_title}</td>
                        <td className="text-nowrap">{item.job_category}</td>
                        <td className="capitalize">{item.status}</td>
                        <td className="space-x-1.5 text-nowrap">
                          <button
                            onClick={() => navigate(`/job-details/${item._id}`)}
                            title="View"
                            className="btn shadow-none border-none bg-transparent p-1.5 text-xl md:text-2xl text-info"
                          >
                            <VscEye />
                          </button>

                          <button
                            title="Edit"
                            onClick={() => navigate(`update/${item._id}`)}
                            className="btn shadow-none border-none bg-transparent p-1.5 text-xl md:text-2xl text-success"
                          >
                            <FaRegEdit />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            title="Delete"
                            className="btn shadow-none border-none bg-transparent p-1.5 text-xl md:text-2xl text-error"
                          >
                            <RiDeleteBinLine />
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

export default MyJobsPage;
