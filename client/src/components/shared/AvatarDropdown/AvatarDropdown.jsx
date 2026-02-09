import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import {
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";
import useAuthInfo from "../../../hooks/useAuthInfo";
import Avatar from "../Avatar/Avatar";
import { toast } from "react-toastify";
import { getAlert } from "../../../utilities/getAlert";
import getAuthErrorMessage from "../../../utilities/getAuthErrorMessage";

const menuItems = [
  {
    to: "/",
    icon: HiOutlineHome,
    label: "Home",
  },
  {
    to: "/dashboard/add-job",
    icon: HiOutlinePlusCircle,
    label: "Add Job",
  },
  {
    to: "/dashboard/profile",
    icon: HiOutlineUser,
    label: "Profile",
  },
];

const AvatarDropdown = () => {
  const { currentUser, logoutUser } = useAuthInfo();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/");
      getAlert({
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-ghost btn-circle transition-all"
        aria-label="User menu"
      >
        <Avatar
          src={currentUser?.photoURL}
          alt={currentUser?.displayName || "User"}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 sm:w-64 rounded-xl shadow-2xl bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-base-300 dark:border-gray-700 bg-primary/5 dark:bg-primary/10">
              <div className="flex items-center gap-3">
                <Avatar
                  src={currentUser?.photoURL}
                  alt={currentUser?.displayName}
                  size="size-10"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {currentUser?.displayName || "User"}
                  </p>
                  <p className="text-xs text-base-content/60 dark:text-gray-400 truncate">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary dark:text-primary font-medium"
                          : "hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-gray-300"
                      }`
                    }
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              {/* Logout */}
              <div className="border-t border-base-300 dark:border-gray-700 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-error hover:bg-error/10 dark:hover:bg-red-900/20 transition-colors"
                >
                  <HiOutlineLogout className="size-5 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarDropdown;
