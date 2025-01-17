import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";

import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/HomePage/Home/Home";
import Dashboard from "../Pages/DashboardPage/Dashboard/Dashboard";
import Scholarships from "../Pages/ScholarshipsPage/Scholarships/Scholarships";
import ScholarshipDetail from "../Pages/ScholarshipsPage/ScholarshipDetail/ScholarshipDetail";
import Application from "../Pages/ApplicationPage/Application";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "scholarships",
        element: (
          <PrivateRoute>
            <Scholarships></Scholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "scholarship/:id",
        element: <ScholarshipDetail></ScholarshipDetail>,
      },
      {
        path: "/apply",
        element: (
          <PrivateRoute>
            <Application></Application>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
]);

export default router;
