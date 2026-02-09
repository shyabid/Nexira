import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import useThemeContext from "../hooks/useThemeContext";

const layoutVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      y: { type: "spring", duration: 0.6 },
    },
  },
};

const RootLayout = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <motion.header
        variants={layoutVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50"
      >
        <Navbar />
      </motion.header>

      <main className="space-y-16 md:space-y-20 w-full min-h-[65dvh] grid grid-cols-1 place-items-center overflow-hidden">
        <Outlet />
      </main>

      <motion.footer
        className="bg-base-200 rounded py-10"
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
      >
        <Footer />
      </motion.footer>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme={theme === "light" ? "light" : "dark"}
      />
    </>
  );
};

export default RootLayout;
