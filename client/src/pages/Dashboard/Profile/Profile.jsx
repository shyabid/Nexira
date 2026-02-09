// src/pages/Dashboard/ProfilePage.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineUser,
  HiOutlinePencilAlt,
  HiOutlineMail,
  HiOutlineCalendar,
} from "react-icons/hi";
import useAuthInfo from "../../../hooks/useAuthInfo";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import Avatar from "../../../components/shared/Avatar/Avatar";
import MyButton from "../../../components/ui/MyButton/MyButton";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthInfo();
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".stagger-item");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen py-8"
    >
      <MyContainer>
        <div ref={containerRef} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="stagger-item text-center mb-10">
            <MyTitle>My Profile</MyTitle>
            <p className="mt-3 text-base-content/70 dark:text-gray-300">
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <motion.div
            className="stagger-item card bg-base-100 dark:bg-gray-800 shadow-xl border border-base-300 dark:border-gray-700"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-body items-center text-center">
              <Avatar
                src={currentUser?.photoURL}
                alt={currentUser?.displayName}
                size="size-32 md:size-40"
              />

              <div className="mt-6">
                <h2 className="text-2xl font-bold font-['Raleway']">
                  {currentUser?.displayName || "User"}
                </h2>
                <p className="text-base-content/60 dark:text-gray-400 mt-1">
                  {currentUser?.email}
                </p>
              </div>

              <div className="mt-8 w-full space-y-4">
                <div className="flex items-center gap-4 text-left">
                  <HiOutlineUser className="size-6 text-primary dark:text-primary" />
                  <div>
                    <p className="text-sm text-base-content/50 dark:text-gray-500">
                      Full Name
                    </p>
                    <p className="font-medium">
                      {currentUser?.displayName || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left">
                  <HiOutlineMail className="size-6 text-primary dark:text-primary" />
                  <div>
                    <p className="text-sm text-base-content/50 dark:text-gray-500">
                      Email
                    </p>
                    <p className="font-medium">{currentUser?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left">
                  <HiOutlineCalendar className="size-6 text-primary dark:text-primary" />
                  <div>
                    <p className="text-sm text-base-content/50 dark:text-gray-500">
                      Member Since
                    </p>
                    <p className="font-medium">
                      {currentUser?.metadata?.creationTime
                        ? new Date(
                            currentUser.metadata.creationTime
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-actions mt-8">
                <MyButton onClick={() => navigate("../update-profile")}>
                  <HiOutlinePencilAlt className="size-5" />
                  Edit Profile
                </MyButton>
              </div>
            </div>
          </motion.div>
        </div>
      </MyContainer>
    </motion.section>
  );
};

export default Profile;
