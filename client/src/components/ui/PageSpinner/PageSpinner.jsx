import { RotateLoader } from "react-spinners";
import useThemeContext from "../../../hooks/useThemeContext";

const PageSpinner = () => {
  const { theme } = useThemeContext();

  const color = theme === "light" ? "#086972" : "#00f7ff";

  return (
    <div className="w-full min-h-dvh grid place-items-center">
      <RotateLoader color={color} />
    </div>
  );
};

export default PageSpinner;
