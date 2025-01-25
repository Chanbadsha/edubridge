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
import UserRoute from "./UserRoute";
import ManageScholarship from "../Pages/DashboardPage/SharedDashboard/ManageScholarship/ManageScholarship";
import EditScholarship from "../Pages/DashboardPage/SharedDashboard/EditScholarship/EditScholarship";
import SharedRouter from "./SharedRouter";
import AddScholarship from "../Pages/DashboardPage/SharedDashboard/AddScholarship/AddScholarship";
import ManageUser from "../Pages/DashboardPage/SharedDashboard/ManageUser/ManageUser";
import ManageUserReview from "../Pages/DashboardPage/SharedDashboard/ManageUserReview/ManageUserReview";
import ManageUserApplication from "../Pages/DashboardPage/SharedDashboard/ManageUserApplication/ManageUserApplication";
import UserApplicationFeedback from "../Pages/DashboardPage/SharedDashboard/ManageUserApplication/UserApplicationFeedback";
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
      // Shared Admin And Moderator Route
      {
        path: "/dashboard/shared/manage-scholarship",
        element: (
          <SharedRouter>
            <ManageScholarship></ManageScholarship>
          </SharedRouter>
        ),
      },
      {
        path: "/dashboard//shared/edit-scholarship/:id",
        element: (
          <SharedRouter>
            <EditScholarship></EditScholarship>
          </SharedRouter>
        ),
      },
      {
        path: "/dashboard/admin/manage-user",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard//shared/add-scholarship",
        element: (
          <SharedRouter>
            <AddScholarship></AddScholarship>
          </SharedRouter>
        ),
      },
      {
        path: "/dashboard//shared/manage-review",
        element: (
          <SharedRouter>
            <ManageUserReview></ManageUserReview>
          </SharedRouter>
        ),
      },
      {
        path: "/dashboard//shared/manage-application",
        element: (
          <SharedRouter>
            <ManageUserApplication></ManageUserApplication>
          </SharedRouter>
        ),
      },
      {
        path: "/dashboard/shared/application-feedback/:id",
        element: (
          <SharedRouter>
            <UserApplicationFeedback></UserApplicationFeedback>
          </SharedRouter>
        ),
      },
      // Admin Route
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
        element: (
          <UserRoute>
            <UserProfile></UserProfile>
          </UserRoute>
        ),
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
        element: (
          <UserRoute>
            <UserReviewForm></UserReviewForm>
          </UserRoute>
        ),
      },
      {
        path: "/dashboard/update-review/:id",
        element: (
          <UserRoute>
            <UserReviewEditForm></UserReviewEditForm>
          </UserRoute>
        ),
      },
    ],
  },
]);

export default router;
