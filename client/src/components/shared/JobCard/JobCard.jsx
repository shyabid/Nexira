import { MdOutlineVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import Badge from "../../ui/Badge/Badge";

const JobCard = ({ singleJob }) => {
  const navigate = useNavigate();
  const { _id, job_title, job_image, job_category, job_summary, posted_by } =
    singleJob || {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onClick={() => navigate(`/job-details/${_id}`)}
      className="bg-base-300 dark:border-2 border-white/20 rounded-lg shadow-lg dark:shadow-white/30 dark:shadow-md overflow-hidden cursor-pointer"
    >
      <figure className="relative">
        <img
          src={job_image}
          alt={job_title}
          className="aspect-3/2 object-cover w-full max-h-44 sm:max-h-36 lg:max-h-44"
        />
        <Badge className="absolute bottom-3 right-5">{job_category}</Badge>
      </figure>

      <div className="space-y-2 p-4">
        <div className="flex items-center gap-1.5 text-sm text-primary/60 dark:text-primary">
          <span>
            <MdOutlineVerifiedUser />
          </span>
          <span>{posted_by}</span>
        </div>

        <div
          data-tip={job_title}
          className="tooltip tooltip-top tooltip-primary"
        >
          <h4 className="line-clamp-1 text-lg text-neutral font-semibold ">
            {job_title}
          </h4>
        </div>
        <p className="line-clamp-2">{job_summary}</p>
      </div>
    </motion.div>
  );
};

export default JobCard;
