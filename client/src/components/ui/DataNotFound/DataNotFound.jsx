import { useNavigate } from "react-router";
import MyButton from "../MyButton/MyButton";
import emptyBox from "../../../../lotties/empty_box.json";
import Lottie from "lottie-react";

const DataNotFound = ({ children, value }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-5 max-w-md w-full text-center mx-auto">
      {/* <img src={image} alt="Data Not Found" /> */}
      <div className="size-60 sm:size-64">
        <Lottie animationData={emptyBox} loop={true} />
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{children}</h3>
      {value === "jobs" && (
        <MyButton onClick={() => navigate("/all-jobs")}>Explore Jobs</MyButton>
      )}

      {value === "tasks" && (
        <MyButton onClick={() => navigate("/dashboard/add-job")}>
          Post Your Job
        </MyButton>
      )}
    </div>
  );
};

export default DataNotFound;
