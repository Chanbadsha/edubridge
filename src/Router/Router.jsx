import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Scholarships from "../Pages/HomePage/Scholarships/Scholarships/Scholarships";
import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/HomePage/Home/Home";
import Dashboard from "../Pages/DashboardPage/Dashboard/Dashboard";

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
