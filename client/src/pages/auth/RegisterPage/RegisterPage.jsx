import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import MyButton from "../../../components/ui/MyButton/MyButton";
import ActionSpinner from "../../../components/ui/ActionSpinner/ActionSpinner";
import getAuthErrorMessage from "../../../utilities/getAuthErrorMessage";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";
import registerGIF from "../../../../lotties/register.json";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import Lottie from "lottie-react";
import { loginSuccessMessage } from "../../../utilities/getLoginMessage";
import GoogleButton from "../../../components/ui/GoogleButton/GoogleButton";
import MyLabel from "../../../components/ui/MyLabel/MyLabel";
import MyInput from "../../../components/ui/MyInput/MyInput";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile } = useAuthInfo();
  const { googleLoading, handleGoogleLogin } = useGoogleLogin();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const displayName = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;

    if (!displayName || !email || !photoURL) {
      toast.warn("Enter valid information");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!upperCase.test(password)) {
      toast.warn("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }

    if (!lowerCase.test(password)) {
      toast.warn("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    if (password.includes(" ")) {
      toast.warn("Password cannot contain spaces");
      return;
    }

    try {
      const userCreds = await createUser(email, password);
      const user = userCreds.user;

      await updateUserProfile({ ...user, photoURL, displayName });

      loginSuccessMessage(user.displayName);
      navigate("/", { replace: true });
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Create your account - Nexira</title>

      <motion.section
        className="py-8 my-6"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
      >
        <MyContainer>
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <MyTitle>Register Now</MyTitle>
            </div>

            <div className="p-4 md:p-8 rounded-md shadow-md bg-primary/7 dark:bg-info/15 flex lg:items-center lg:justify-between lg:gap-8 max-w-md lg:max-w-full mx-auto">
              <div className="flex-1/2">
                <form onSubmit={handleCreateUser} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <MyLabel htmlFor="name">Name</MyLabel>
                    <MyInput
                      disabled={loading}
                      name="name"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <MyLabel htmlFor="email">Email</MyLabel>
                    <MyInput
                      name="email"
                      type="email"
                      disabled={loading}
                      placeholder="john-doe@gmail.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <MyLabel htmlFor="photoURL">Photo URL</MyLabel>
                    <MyInput
                      type="url"
                      disabled={loading}
                      name="photoURL"
                      placeholder="https://example.png"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <MyLabel htmlFor="password">Password</MyLabel>
                    <div className="relative">
                      <MyInput
                        disabled={loading}
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <span
                        onClick={() => setShow(!show)}
                        className="cursor-pointer absolute right-5 top-[50%] -translate-y-[50%] z-10"
                      >
                        {show ? <VscEye /> : <VscEyeClosed />}
                      </span>
                    </div>
                  </div>

                  <div>
                    <MyButton
                      disabled={loading || googleLoading}
                      className="btn-block"
                    >
                      {loading ? <ActionSpinner /> : "Register"}
                    </MyButton>
                  </div>

                  <div className="text-center">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="link link-hover">
                      Login here
                    </Link>
                  </div>

                  <div className="divider divider-neutral">OR</div>

                  <GoogleButton
                    disabled={loading || googleLoading}
                    onClick={handleGoogleLogin}
                  />
                </form>
              </div>

              <div className="flex-1/2 hidden lg:inline-block">
                <Lottie animationData={registerGIF} loop={true} />
              </div>
            </div>
          </div>
        </MyContainer>
      </motion.section>
    </>
  );
};

export default RegisterPage;
