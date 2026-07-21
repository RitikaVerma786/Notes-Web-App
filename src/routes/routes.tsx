import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/mainLayout/MainLayout";
import NotesPage from "../pages/notes/NotesPage";
import AuthLayout from "../layout/authLayout/AuthLayout";
import Signup from "../pages/signupPage/Signup";
import Login from "../pages/loginPage/Login";
import { ProtectedRoutes } from "./protectedRoutes";
import PublicRoutes from "./publicRoutes";
import Profile from "../pages/profile/Profile";
import { lazy } from "react";
// import Dashboard from "../pages/dashboard/Dashboard";
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const Settings = lazy(() => import("../pages/settings/Settings"));

const Routes = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Signup /> },
          { path: "login", element: <Login /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/notes",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <NotesPage />,
          }
        ],
      },
      {
        path: "/profile",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          }
        ],
      },
      {
        path: "/settings",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Settings />,
          }
        ],
      },
    ],
  },
]);
export default Routes;
