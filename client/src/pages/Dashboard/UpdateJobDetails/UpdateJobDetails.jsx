// src/pages/Dashboard/UpdateJobDetails.jsx
import { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import MyButton from "../../../components/ui/MyButton/MyButton";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";
import ActionSpinner from "../../../components/ui/ActionSpinner/ActionSpinner";
import FetchSpinner from "../../../components/ui/FetchSpinner/FetchSpinner";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utilities/getAlert";
import MyLabel from "../../../components/ui/MyLabel/MyLabel";
import MyInput from "../../../components/ui/MyInput/MyInput";

const categories = [
  "AI & Machine Learning",
  "Graphics Design",
  "Scriptwriting",
  "Video Editing",
  "UI/UX Design",
  "Game Design",
  "3D Modeling",
  "Web Design",
  "Data Entry",
];

const jobTypes = ["Full-time", "Part-time", "Freelance", "Contract"];
const experienceLevels = [
  "Entry-Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
];

const UpdateJobDetails = () => {
  const { id } = useParams();
  const secureAxios = useSecureAxios();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [job, setJob] = useState({});
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const { data } = await secureAxios.get(`/jobs/${id}`);
        if (data.success) {
          setJob(data.single_job);
        }
      } catch {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, secureAxios]);

  // GSAP stagger animation
  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".stagger-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }
  }, [loading]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    // Trim all values
    Object.keys(updatedData).forEach((key) => {
      if (typeof updatedData[key] === "string") {
        updatedData[key] = updatedData[key].trim();
      }
    });

    try {
      const { data } = await secureAxios.put(`/jobs/${id}`, updatedData);

      if (data.success) {
        setJob((prev) => ({ ...prev, ...updatedData }));

        getAlert({
          title: "Job updated successfully!",
          icon: "success",
          timer: 3000,
        });

        navigate("/dashboard/my-jobs");
      }
    } catch {
      toast.error("Failed to update job. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <FetchSpinner className="min-h-screen" />;
  }

  const {
    job_title = "",
    job_category = "",
    job_image = "",
    job_summary = "",
    job_type = "",
    location = "",
    experience_level = "",
    application_deadline = "",
  } = job;

  return (
    <>
      <title>Update Job - Nexira Dashboard</title>

      <section className="py-8 lg:py-12">
        <MyContainer ref={containerRef}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 stagger-item"
          >
            <MyTitle>Update Job Posting</MyTitle>
            <p className="mt-4 text-lg text-base-content/70 dark:text-gray-400">
              Edit the details of your job listing
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="stagger-item bg-base-100 dark:bg-gray-800 rounded-2xl shadow-2xl border border-base-300 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6 sm:p-8 lg:p-12">
              <form onSubmit={handleUpdate} className="space-y-10">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-['Raleway'] text-primary">
                    Basic Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <MyLabel htmlFor="job_title">Job Title</MyLabel>
                      <MyInput
                        name="job_title"
                        defaultValue={job_title}
                        placeholder="Enter job title"
                        disabled={updating}
                      />
                    </div>
                    <div className="space-y-2">
                      <MyLabel htmlFor="job_category">Category</MyLabel>
                      <select
                        name="job_category"
                        defaultValue={job_category}
                        className="select select-bordered select-primary w-full"
                        disabled={updating}
                        required
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <MyLabel htmlFor="job_image">Job Image URL</MyLabel>
                    <MyInput
                      type="url"
                      name="job_image"
                      defaultValue={job_image}
                      placeholder="https://example.com/image.jpg"
                      disabled={updating}
                    />
                  </div>

                  <div className="space-y-2">
                    <MyLabel htmlFor="job_summary">Job Summary</MyLabel>
                    <textarea
                      name="job_summary"
                      rows="4"
                      defaultValue={job_summary}
                      placeholder="Brief description of the job..."
                      className="textarea textarea-bordered textarea-primary w-full resize-none"
                      disabled={updating}
                      required
                    />
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-['Raleway'] text-primary">
                    Job Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <MyLabel htmlFor="job_type">Job Type</MyLabel>
                      <select
                        name="job_type"
                        defaultValue={job_type}
                        className="select select-bordered w-full"
                        disabled={updating}
                        required
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        {jobTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <MyLabel htmlFor="location">Location</MyLabel>
                      <MyInput
                        name="location"
                        defaultValue={location}
                        placeholder="e.g. Remote, London"
                        disabled={updating}
                      />
                    </div>

                    <div className="space-y-2">
                      <MyLabel htmlFor="experience_level">
                        Experience Level
                      </MyLabel>
                      <select
                        name="experience_level"
                        defaultValue={experience_level}
                        className="select select-bordered w-full"
                        disabled={updating}
                        required
                      >
                        <option value="" disabled>
                          Select level
                        </option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <MyLabel htmlFor="application_deadline">
                        Application Deadline
                      </MyLabel>
                      <MyInput
                        type="date"
                        name="application_deadline"
                        defaultValue={application_deadline}
                        min={new Date().toISOString().split("T")[0]}
                        className="input input-bordered w-full"
                        disabled={updating}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-base-300 dark:border-gray-700">
                  <MyButton disabled={updating} className="btn-block">
                    {updating ? (
                      <>
                        <ActionSpinner />
                      </>
                    ) : (
                      "Update Job"
                    )}
                  </MyButton>
                </div>
              </form>
            </div>
          </motion.div>
        </MyContainer>
      </section>
    </>
  );
};

export default UpdateJobDetails;
