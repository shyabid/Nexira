import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage/Homepage";
import PrivateRoute from "./PrivateRoute";
import AllJobsPage from "../pages/AllJobsPage/AllJobsPage";
import JobDetailsPage from "../pages/JobDetailsPage/JobDetailsPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/Dashboard/Overview/Overview";
import AddJobPage from "../pages/Dashboard/AddJobPage/AddJobPage";
import MyJobsPage from "../pages/Dashboard/MyJobsPage/MyJobsPage";
import UpdateJobDetails from "../pages/Dashboard/UpdateJobDetails/UpdateJobDetails";
import MyAcceptedTasksPage from "../pages/Dashboard/MyAcceptedTasksPage/MyAcceptedTasksPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import Profile from "../pages/Dashboard/Profile/Profile";
import EditProfile from "../pages/Dashboard/Profile/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "job-details/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "all-jobs",
        element: <AllJobsPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "add-job",
            element: <AddJobPage />,
          },
          {
            path: "my-jobs",
            element: <MyJobsPage />,
          },
          {
            path: "my-jobs/update/:id",
            element: <UpdateJobDetails />,
          },
          {
            path: "my-accepted-tasks",
            element: <MyAcceptedTasksPage />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "update-profile",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
