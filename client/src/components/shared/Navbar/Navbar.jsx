import Logo from "../Logo/Logo";
import { useMemo } from "react";
import { LuSun } from "react-icons/lu";
import { BsMoon } from "react-icons/bs";
import MyButton from "../../ui/MyButton/MyButton";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router";
import MyContainer from "../MyContainer/MyContainer";
import useThemeContext from "../../../hooks/useThemeContext";
import AvatarDropdown from "../AvatarDropdown/AvatarDropdown";

const Navbar = () => {
  const { currentUser } = useAuthInfo();
  const navigate = useNavigate();
  const { toggleTheme, theme } = useThemeContext();

  const navLinks = useMemo(() => {
    const navItems = [
      { label: "Home", path: "/" },
      { label: "All Jobs", path: "/all-jobs" },
      { label: "About Us", path: "/about-us" },
      { label: "Contact Us", path: "/contact-us" },
    ];

    if (currentUser) {
      const dashboard = {
        label: "Dashboard",
        path: "/dashboard",
      };

      navItems.splice(2, 0, dashboard);
    }

    return navItems.map(({ label, path }, index) => (
      <li key={index + 1}>
        <NavLink to={path} className="nav_links">
          {label}
        </NavLink>
      </li>
    ));
  }, [currentUser]);

  return (
    <nav className="backdrop-blur-sm bg-primary/17 dark:shadow-white/30 dark:bg-primary/10 shadow-sm">
      <MyContainer>
        <div className="navbar p-0">
          <div className="navbar-start gap-1.5">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost p-1 lg:hidden"
              >
                <HiOutlineMenuAlt1 className="text-xl sm:text-2xl md:text-3xl" />
              </div>

              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                {navLinks}
              </ul>
            </div>

            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3.5 text-base">
              {navLinks}
            </ul>
          </div>

          <div className="navbar-end gap-3">
            <label className="swap swap-rotate text-primary/70">
              <input
                onChange={toggleTheme}
                type="checkbox"
                checked={theme === "night"}
              />

              <LuSun className="size-8 swap-off" />

              <BsMoon className="size-7 swap-on" />
            </label>

            {currentUser ? (
              <>
                <AvatarDropdown />
              </>
            ) : (
              <>
                <MyButton onClick={() => navigate("/auth/login")}>
                  Login
                </MyButton>

                <MyButton
                  onClick={() => navigate("/auth/register")}
                  className="hidden sm:inline-flex"
                >
                  Register
                </MyButton>
              </>
            )}
          </div>
        </div>
      </MyContainer>
    </nav>
  );
};

export default Navbar;
