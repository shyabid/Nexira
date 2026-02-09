import { useEffect, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    const checked = e.currentTarget.checked;
    setTheme(checked ? "night" : "light");
  };

  return (
    <>
      <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
    </>
  );
};

export default ThemeProvider;
