// src/pages/JobDetailsPage.jsx
import { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineStar,
  HiOutlineDocumentText,
  HiOutlineSparkles,
} from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";

import MyContainer from "../../components/shared/MyContainer/MyContainer";
import MyButton from "../../components/ui/MyButton/MyButton";
import Badge from "../../components/ui/Badge/Badge";
import FetchSpinner from "../../components/ui/FetchSpinner/FetchSpinner";
import ActionSpinner from "../../components/ui/ActionSpinner/ActionSpinner";
import useAuthInfo from "../../hooks/useAuthInfo";
import usePublicAxios from "../../hooks/usePublicAxios";
import useSecureAxios from "../../hooks/useSecureAxios";
import { getAlert } from "../../utilities/getAlert";
import { toast } from "react-toastify";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthInfo();
  const publicAxios = usePublicAxios();
  const secureAxios = useSecureAxios();

  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const { data } = await publicAxios.get(`/jobs/${id}`);
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
  }, [id, publicAxios]);

  // GSAP stagger animation on content load
  useEffect(() => {
    if (!loading && contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll(".stagger-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }
  }, [loading]);

  const handleAcceptJob = async () => {
    if (!currentUser) {
      navigate("/auth/login");
      return;
    }

    setAcceptLoading(true);
    const updatedStatus = { status: "accepted" };
    const newTask = {
      job_id: id,
      accepted_user_name: currentUser.displayName,
      accepted_user_email: currentUser.email,
      accepted_at: new Date().toISOString(),
    };

    try {
      const { data: updateData } = await secureAxios.put(
        `/jobs/${id}`,
        updatedStatus,
      );
      if (updateData.success) {
        setJob((prev) => ({ ...prev, status: "accepted" }));

        await secureAxios.post("/added-tasks", newTask);
        getAlert({ title: "Job accepted successfully!" });
      }
    } catch {
      toast.error("Failed to accept job. Try again.");
    } finally {
      setAcceptLoading(false);
    }
  };

  if (loading) return <FetchSpinner className="min-h-dvh" />;

  const {
    job_title,
    job_image,
    job_category,
    job_summary,
    posted_by,
    creator_email,
    created_at,
    status,
    salary_min,
    salary_max,
    currency,
    salary_period,
    job_type,
    location,
    experience_level,
    application_deadline,
    requirements = [],
    responsibilities = [],
    benefits = [],
    company_description,
  } = job;

  const isOwner = currentUser?.email === creator_email;
  const isAccepted = status === "accepted";
  const isCompleted = status === "completed";

  return (
    <>
      <title>
        {job_title ? `${job_title} | Nexira` : "Job Details | Nexira"}
      </title>

      <section className="py-12 lg:py-20">
        <MyContainer ref={contentRef}>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Job Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="stagger-item">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text! text-transparent!">
                      {job_title}
                    </h1>
                    <p className="mt-3 text-xl text-base-content/80 dark:text-gray-300">
                      {posted_by}
                    </p>
                  </div>
                  <Badge variant="primary" size="lg">
                    {job_category}
                  </Badge>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    { icon: HiOutlineBriefcase, label: job_type },
                    { icon: HiOutlineMapPin, label: location },
                    { icon: HiOutlineClock, label: experience_level },
                    {
                      icon: HiOutlineCurrencyDollar,
                      label:
                        salary_min &&
                        salary_max &&
                        currency &&
                        salary_period &&
                        `${salary_min?.toLocaleString()} - ${salary_max?.toLocaleString()} ${currency} / ${salary_period}`,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="stagger-item flex items-center gap-3 bg-base-200/50 dark:bg-gray-800/50 p-4 rounded-xl"
                    >
                      <item.icon className="size-6 text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="stagger-item">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <HiOutlineDocumentText className="text-primary" />
                  Job Summary
                </h2>
                <p className="text-base-content/80 dark:text-gray-300 leading-relaxed text-lg">
                  {job_summary}
                </p>
              </div>
            </div>

            {/* Image + CTA */}
            <div className="stagger-item lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-base-300 dark:border-gray-700">
                  <img
                    src={job_image}
                    alt={job_title}
                    className="w-full aspect-video object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {!isOwner && (
                  <MyButton
                    size="lg"
                    className="w-full"
                    disabled={acceptLoading || isAccepted || isCompleted}
                    onClick={handleAcceptJob}
                  >
                    {acceptLoading ? (
                      <ActionSpinner />
                    ) : isCompleted ? (
                      "Job Completed"
                    ) : isAccepted ? (
                      <>
                        Accepted <HiOutlineCheckCircle className="ml-2" />
                      </>
                    ) : (
                      "Accept This Job"
                    )}
                  </MyButton>
                )}

                <div className="bg-base-200 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <HiOutlineCalendar className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-base-content/60">Posted on</p>
                      <p className="font-medium">
                        {format(new Date(created_at), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiOutlineMail className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-base-content/60">Contact</p>
                      <p className="font-medium truncate">{creator_email}</p>
                    </div>
                  </div>
                  {application_deadline && (
                    <div className="flex items-center gap-3">
                      <HiOutlineSparkles className="size-5 text-primary" />
                      <div>
                        <p className="text-sm text-base-content/60">Deadline</p>
                        <p className="font-medium">
                          {format(
                            new Date(application_deadline),
                            "MMMM d, yyyy",
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="stagger-item">
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <HiOutlineStar className="text-primary" />
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <HiOutlineCheckCircle className="size-5 text-success mt-0.5 shrink-0" />
                      <span className="text-base-content/80 dark:text-gray-300">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {responsibilities.length > 0 && (
              <div className="stagger-item">
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <HiOutlineDocumentText className="text-primary" />
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-base-content/80 dark:text-gray-300">
                        {res}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="stagger-item">
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <HiOutlineUserGroup className="text-primary" />
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <HiOutlineSparkles className="size-5 text-warning mt-0.5 shrink-0" />
                      <span className="text-base-content/80 dark:text-gray-300">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Company Description */}

          <motion.div
            className="stagger-item mt-12 bg-base-200 dark:bg-gray-800/50 rounded-2xl p-8 border border-base-300 dark:border-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">About the Company</h2>
            <p className="text-lg text-base-content/80 dark:text-gray-300 leading-relaxed">
              {company_description}
            </p>
          </motion.div>
        </MyContainer>
      </section>
    </>
  );
};

export default JobDetailsPage;
