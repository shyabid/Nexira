import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { toast } from "react-toastify";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import MyButton from "../../../components/ui/MyButton/MyButton";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";
import ActionSpinner from "../../../components/ui/ActionSpinner/ActionSpinner";
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
const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];

const AddJobPage = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // GSAP stagger animation on mount
  useEffect(() => {
    if (containerRef.current) {
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData);

    // Trim strings
    Object.keys(jobData).forEach((key) => {
      if (typeof jobData[key] === "string") {
        jobData[key] = jobData[key].trim();
      }
    });

    // Convert numbers
    jobData.salary_min = Number(jobData.salary_min || 0);
    jobData.salary_max = Number(jobData.salary_max || 0);

    if (jobData.salary_min > jobData.salary_max) {
      toast.warn("Min salary cannot exceed max salary");
      setLoading(false);
      return;
    }

    // Auto-fill
    jobData.posted_by = currentUser?.displayName || "Anonymous";
    jobData.creator_email = currentUser?.email;

    // Handle list fields (one per line)
    ["requirements", "responsibilities", "benefits"].forEach((field) => {
      if (jobData[field]) {
        jobData[field] = jobData[field]
          .split("\n")
          .map((item) => item.trim().replace(/^[-•*]\s*/, "")) // clean bullets
          .filter(Boolean);
      } else {
        jobData[field] = [];
      }
    });

    try {
      const { data } = await secureAxios.post("/jobs", jobData);

      if (data.success) {
        e.target.reset();

        getAlert({
          title: "Job posted successfully!",
          icon: "success",
          timer: 3000,
        });
      }
    } catch {
      toast.error("Failed to post job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Post a Job - Nexira Dashboard</title>

      <section className="py-8 lg:py-12">
        <MyContainer ref={containerRef}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 stagger-item"
          >
            <MyTitle>Post a New Job</MyTitle>
            <p className="mt-4 text-lg text-base-content/70 dark:text-gray-400">
              Reach talented professionals by posting your opportunity
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
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-['Raleway'] text-primary">
                    Basic Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <MyLabel htmlFor={"job_title"}>
                        Job Title <span className="text-error">*</span>
                      </MyLabel>
                      <MyInput
                        name="job_title"
                        placeholder="e.g. Senior Frontend Developer"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <MyLabel htmlFor="job_category">
                        Category <span className="text-error">*</span>
                      </MyLabel>
                      <select
                        name="job_category"
                        className="select select-bordered select-primary w-full"
                        defaultValue=""
                        required
                        disabled={loading}
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
                    <MyLabel htmlFor="job_image">
                      Job Image URL <span className="text-error">*</span>
                    </MyLabel>
                    <MyInput
                      type="url"
                      name="job_image"
                      placeholder="https://example.com/image.jpg"
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <MyLabel htmlFor="job_summary">
                      Job Summary <span className="text-error">*</span>
                    </MyLabel>
                    <textarea
                      name="job_summary"
                      rows="4"
                      placeholder="Brief overview of the role and key objectives..."
                      className="textarea textarea-bordered textarea-primary w-full resize-none"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-['Raleway'] text-primary">
                    Job Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <MyLabel htmlFor="job_type">
                        Job Type <span className="text-error">*</span>
                      </MyLabel>
                      <select
                        name="job_type"
                        className="select select-bordered w-full"
                        defaultValue=""
                        required
                        disabled={loading}
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
                      <MyLabel htmlFor="location">
                        Location <span className="text-error">*</span>
                      </MyLabel>
                      <MyInput
                        name="location"
                        placeholder="Remote / New York / London"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <MyLabel htmlFor="experience_level">
                        Experience Level <span className="text-error">*</span>
                      </MyLabel>
                      <select
                        name="experience_level"
                        className="select select-bordered w-full"
                        defaultValue=""
                        required
                        disabled={loading}
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
                        Application Deadline{" "}
                        <span className="text-error">*</span>
                      </MyLabel>
                      <MyInput
                        type="date"
                        name="application_deadline"
                        min={new Date().toISOString().split("T")[0]}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-['Raleway'] text-primary">
                    Compensation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <MyLabel htmlFor="salary_min">Min Salary</MyLabel>
                      <MyInput
                        type="number"
                        name="salary_min"
                        placeholder="50000"
                        min="0"
                        className="input input-bordered w-full"
                        required={false}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <MyLabel className="label font-semibold">
                        Max Salary
                      </MyLabel>
                      <MyInput
                        type="number"
                        name="salary_max"
                        placeholder="120000"
                        min="0"
                        className="input input-bordered w-full"
                        disabled={loading}
                        required={false}
                      />
                    </div>
                    <div className="space-y-2">
                      <MyLabel htmlFor="currency">Currency</MyLabel>
                      <select
                        name="currency"
                        className="select select-bordered w-full"
                        defaultValue="USD"
                        disabled={loading}
                      >
                        {currencies.map((cur) => (
                          <option key={cur} value={cur}>
                            {cur}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <MyLabel name="salary_period">Period</MyLabel>
                      <select
                        name="salary_period"
                        className="select select-bordered w-full"
                        defaultValue="year"
                        disabled={loading}
                        required={false}
                      >
                        <option value="hour">Per Hour</option>
                        <option value="month">Per Month</option>
                        <option value="year">Per Year</option>
                        <option value="project">Per Project</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Lists */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-['Raleway'] text-primary">
                    Details & Benefits
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <MyLabel name="requirements">
                        Requirements (one per line){" "}
                        <span className="text-error">*</span>
                      </MyLabel>
                      <textarea
                        name="requirements"
                        rows="7"
                        placeholder="• 5+ years experience&#10;• React & TypeScript&#10;• Leadership skills"
                        className="textarea textarea-bordered w-full font-mono text-sm leading-relaxed"
                        disabled={loading}
                        required={true}
                      />
                    </div>
                    <div className="space-y-2">
                      <MyLabel htmlFor="responsibilities">
                        Responsibilities (one per line){" "}
                        <span className="text-error">*</span>
                      </MyLabel>
                      <textarea
                        name="responsibilities"
                        rows="7"
                        placeholder="• Lead frontend team&#10;• Architect solutions&#10;• Code reviews"
                        className="textarea textarea-bordered w-full font-mono text-sm leading-relaxed"
                        disabled={loading}
                        required={true}
                      />
                    </div>
                    <div className="space-y-2">
                      <MyLabel htmlFor="benefits">
                        Benefits (one per line){" "}
                        <span className="text-error">*</span>
                      </MyLabel>
                      <textarea
                        name="benefits"
                        rows="7"
                        placeholder="• Full remote&#10;• Health insurance&#10;• Stock options"
                        className="textarea textarea-bordered w-full font-mono text-sm leading-relaxed"
                        disabled={loading}
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                <div className="space-y-2">
                  <MyLabel htmlFor="company_description">
                    Company Description <span className="text-error">*</span>
                  </MyLabel>
                  <textarea
                    name="company_description"
                    rows="4"
                    placeholder="Tell candidates about your company culture, mission, and team..."
                    className="textarea textarea-bordered w-full"
                    disabled={loading}
                    required={true}
                  />
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-base-300 dark:border-gray-700">
                  <MyButton disabled={loading}>
                    {loading ? (
                      <>
                        <ActionSpinner />
                      </>
                    ) : (
                      "Post Job Opening"
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

export default AddJobPage;
