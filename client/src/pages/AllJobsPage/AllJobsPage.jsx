import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HiOutlineSearch } from "react-icons/hi";

import MyTitle from "../../components/ui/MyTitle/MyTitle";
import JobCard from "../../components/shared/JobCard/JobCard";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/shared/MyContainer/MyContainer";
import FetchSpinner from "../../components/ui/FetchSpinner/FetchSpinner";

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

const AllJobsPage = () => {
  const publicAxios = usePublicAxios();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Filters & Search
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch jobs with filters
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const params = {
          page,
          limit,
          search: search || undefined,
          category: category || undefined,
          job_type: jobType || undefined,
          location: location || undefined,
          experience_level: experience || undefined,
          sortBy,
          sortOrder,
          excludes:
            "creator_email,status,requirements,responsibilities,benefits,company_description",
        };

        const { data } = await publicAxios.get("/jobs", { params });

        if (data.success) {
          setJobs(data.jobs);
          setTotalPages(Math.ceil(data.pagination.totalJobs / limit) || 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchJobs(), 400);
    return () => clearTimeout(timer);
  }, [
    search,
    category,
    jobType,
    location,
    experience,
    sortBy,
    sortOrder,
    page,
    publicAxios,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setJobType("");
    setLocation("");
    setExperience("");
    setSortBy("created_at");
    setSortOrder("desc");
    setPage(1);
  };

  return (
    <>
      <title>Explore All Jobs - Nexira</title>

      <section className="py-12 lg:py-16">
        <MyContainer>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <MyTitle>Explore All Jobs</MyTitle>
            <p className="mt-4 text-lg text-base-content/70 dark:text-gray-300 max-w-3xl mx-auto">
              Discover opportunities from top companies and talented freelancers
              worldwide
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-2/3 relative">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-base-content/50" />
                <input
                  type="search"
                  placeholder="Search by title, summary, or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input input-bordered input-primary w-full pl-12"
                />
              </div>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [by, order] = e.target.value.split("-");
                  setSortBy(by);
                  setSortOrder(order);
                }}
                className="select select-bordered w-full lg:w-64 flex-1/3"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="salary_max-desc">Salary: High to Low</option>
                <option value="salary_max-asc">Salary: Low to High</option>
              </select>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="select select-bordered"
              >
                <option value="">All Job Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <input
                type="search"
                placeholder="Location (e.g. Remote)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input input-bordered"
              />

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="select select-bordered"
              >
                <option value="">All Experience Levels</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="btn btn-outline btn-error"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Jobs Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <FetchSpinner />
            </div>
          ) : jobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-base-content/50 dark:text-gray-500">
                No jobs found matching your criteria.
              </p>
              <button onClick={resetFilters} className="mt-6 btn btn-primary">
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7">
                {jobs.map((job) => (
                  <JobCard key={job._id} singleJob={job} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap justify-center gap-2 mt-12"
                >
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn btn-outline btn-sm disabled:text-neutral/80"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`btn btn-sm ${
                        page === i + 1 ? "btn-primary" : "btn-outline"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="btn btn-outline btn-sm disabled:text-neutral/80"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}
        </MyContainer>
      </section>
    </>
  );
};

export default AllJobsPage;
