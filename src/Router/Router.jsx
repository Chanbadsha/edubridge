import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";

import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/HomePage/Home/Home";
import Dashboard from "../Pages/DashboardPage/Dashboard/Dashboard";
import Scholarships from "../Pages/ScholarshipsPage/Scholarships/Scholarships";
import ScholarshipDetail from "../Pages/ScholarshipsPage/ScholarshipDetail/ScholarshipDetail";

import ScholarshipApplicationForm from "../Pages/ApplicationPage/ScholarshipApplicationForm";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import AdminProfile from "../Pages/DashboardPage/AdminPage/AdminProfile/AdminProfile";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import MyProfile from "../Pages/DashboardPage/ModeratorPage/MyProfile/ModeratorProfile";
import Payment from "../Pages/PaymentPage/Payment/Payment";
import UserApplication from "../Pages/DashboardPage/UserDashboard/UserApplication/UserApplication";
import UserProfile from "../Pages/DashboardPage/UserDashboard/UserProfile/UserProfile";
import UserReview from "../Pages/DashboardPage/UserDashboard/UserReview/UserReview";
import UpdateApplication from "../Pages/DashboardPage/UserDashboard/UpdateApplication/UpdateApplication";
import UserReviewForm from "../Pages/DashboardPage/UserDashboard/UserReview/UserReviewForm";
import UserReviewEditForm from "../Pages/DashboardPage/UserDashboard/UserReview/UserReviewEditForm";
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
        element: <Scholarships></Scholarships>,
      },
      {
        path: "scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetail></ScholarshipDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/apply/:id",
        element: (
          <PrivateRoute>
            <ScholarshipApplicationForm></ScholarshipApplicationForm>
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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      // Moderator Route
      {
        path: "/dashboard/moderator-profile",
        element: (
          <ModeratorRoute>
            <MyProfile></MyProfile>
          </ModeratorRoute>
        ),
      },
      // User Route
      {
        path: "/dashboard/my-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/dashboard/my-application",
        element: <UserApplication></UserApplication>,
      },
      {
        path: "/dashboard/my-review",
        element: <UserReview></UserReview>,
      },
      {
        path: "/dashboard/update-application/:id",
        element: <UpdateApplication></UpdateApplication>,
      },
      {
        path: "/dashboard/review-application/:id",
        element: <UserReviewForm></UserReviewForm>,
      },
      {
        path: "/dashboard/update-review/:id",
        element: <UserReviewEditForm></UserReviewEditForm>,
      },
    ],
  },
]);

export default router;
