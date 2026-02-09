import { PropagateLoader } from "react-spinners";
import useThemeContext from "../../../hooks/useThemeContext";

const FetchSpinner = ({ className = "min-h-[30dvh]" }) => {
  const { theme } = useThemeContext();

  const color = theme === "light" ? "#086972" : "#00f7ff";

  return (
    <div className={`w-full ${className} grid place-items-center`}>
      <PropagateLoader color={color} />
    </div>
  );
};

export default FetchSpinner;
