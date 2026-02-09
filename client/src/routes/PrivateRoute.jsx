import { Navigate, Outlet, useLocation } from "react-router";
import useAuthInfo from "../hooks/useAuthInfo";

const PrivateRoute = () => {
  const { currentUser } = useAuthInfo();
  const { pathname } = useLocation();

  if (currentUser) {
    return <Outlet />;
  }

  return <Navigate to={"/auth/login"} state={{ path: pathname }} />;
};

export default PrivateRoute;
