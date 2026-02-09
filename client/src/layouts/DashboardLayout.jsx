import { NavLink, Outlet } from "react-router";
import { useEffect, useState, useRef } from "react";
import MyContainer from "../components/shared/MyContainer/MyContainer";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChartBar,
  HiOutlinePlusCircle,
  HiOutlineFolder,
  HiOutlineCheckCircle,
  HiOutlineUser,
} from "react-icons/hi";
import Logo from "../components/shared/Logo/Logo";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import AvatarDropdown from "../components/shared/AvatarDropdown/AvatarDropdown";

const sidebarItems = [
  {
    label: "Overview",
    slug: "/dashboard",
    icon: HiOutlineChartBar,
  },
  {
    label: "Add Job",
    slug: "/dashboard/add-job",
    icon: HiOutlinePlusCircle,
  },
  {
    label: "My Jobs",
    slug: "/dashboard/my-jobs",
    icon: HiOutlineFolder,
  },
  {
    label: "My Accepted Tasks",
    slug: "/dashboard/my-accepted-tasks",
    icon: HiOutlineCheckCircle,
  },
  {
    label: "Profile",
    slug: "/dashboard/profile",
    icon: HiOutlineUser,
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);
  const sidebarLinksRef = useRef([]); // for GSAP stagger

  // Detect mobile and handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setSidebarOpen(false);
      }

      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen, dropdownOpen]);

  // Optional GSAP stagger animation on sidebar open/close
  useEffect(() => {
    if (!isMobile) return; // Only on mobile for performance

    if (sidebarOpen) {
      gsap.fromTo(
        sidebarLinksRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
        },
      );
    }
  }, [sidebarOpen, isMobile]);

  const handleLinkClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  // Framer Motion variants
  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    closed: { x: "-100%", transition: { duration: 0.3, ease: "easeIn" } },
  };

  const backdropVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.07, duration: 0.4 },
    }),
  };

  return (
    <div className="flex h-screen flex-col bg-base-100 dark:bg-gray-900 overflow-hidden">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100 dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between h-16 px-5">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mobile-menu-toggle lg:hidden btn btn-ghost btn-circle btn-sm"
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {sidebarOpen ? (
                <HiOutlineX className="size-5" />
              ) : (
                <HiOutlineMenu className="size-5" />
              )}
            </motion.div>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* User Dropdown */}
          <AvatarDropdown />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.aside
              ref={sidebarRef}
              variants={sidebarVariants}
              initial={isMobile ? "closed" : false}
              animate={isMobile ? (sidebarOpen ? "open" : "closed") : "open"}
              exit="closed"
              className={`${
                !isMobile ? "w-64" : "fixed inset-y-0 left-0 z-30 w-72"
              } bg-base-100 dark:bg-gray-800 border-r border-base-300 dark:border-gray-700 shadow-lg overflow-y-auto h-full`}
              aria-label="Sidebar navigation"
            >
              <nav className="p-5 space-y-2">
                <div className="px-4 py-3 mb-4 border-b border-base-300 dark:border-gray-700">
                  <p className="text-xs font-bold uppercase text-base-content/50 dark:text-gray-400">
                    Menu
                  </p>
                </div>

                {/* Sidebar Links */}
                {sidebarItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.slug}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      // Remove the motion.div wrapper below if you want GSAP stagger instead
                    >
                      <NavLink
                        to={item.slug}
                        end={item.slug === "/dashboard"}
                        className="sidebar_links"
                        onClick={handleLinkClick}
                        ref={(el) => (sidebarLinksRef.current[i] = el)} // for GSAP
                      >
                        <Icon className="size-5 shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}

                {/* Sidebar Footer */}
                <div className="mt-8 pt-4 border-t border-base-300 dark:border-gray-700">
                  <div className="px-4 py-3 text-center text-xs text-base-content/50 dark:text-gray-400">
                    <p>Nexira Dashboard</p>
                    <p className="mt-1 opacity-70">v1.0</p>
                  </div>
                </div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-linear-to-br from-base-50 to-base-100 dark:from-gray-900 dark:to-gray-800 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
