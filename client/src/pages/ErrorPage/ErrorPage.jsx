import { useNavigate } from "react-router";
import MyButton from "../../components/ui/MyButton/MyButton";
import GIF404 from "../../../lotties/page_not_found.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <title>Page Not Found</title>

      <section className="min-h-dvh w-full grid place-items-center px-5 py-8">
        <div className="max-w-md w-full text-center space-y-6">
          <Lottie animationData={GIF404} loop={true} />
          <h1 className="font-bold text-3xl md:text-4xl text-neutral">
            Page Not Found
          </h1>
          <p>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <MyButton onClick={() => navigate("/")}>Back to Home</MyButton>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
