import React from "react";
import useUserData from "../../../../Hooks/UsersData/useUserData";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader/Loader";
import useScholarship from "../../../../Hooks/ScholarshipData/useScholarship";
import useAllUser from "../../../../Hooks/AllUserInfo/useAllUser";
import AllApplicationList from "../../../../Hooks/ApplicationInfo/AllApplicationList";
import PendingApplication from "../../../../Hooks/ApplicationInfo/PendingApplication";
import avatar from "../../../../assets/Logo/profile.png";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
const AdminProfile = () => {
  const { user, loading, userLogOut } = useAuth();
  const [usersInfo] = useUserData();
  const [getAllApplication] = AllApplicationList();
  const [getAllPendingApplication] = PendingApplication();
  const [users] = useAllUser();
  const [scholarships] = useScholarship();
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 mb-6">
      {/* Dashboard Header */}
      <DashboardHeader
        title="Account Overview"
        subtitle="View and update your personal information, application status, and preferences."
      />

      {/* Header Section */}
      <header className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <img
            src={user?.photoURL || avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div className="spy4">
            <h1 className="text-2xl font-bold  flex flex-col md:flex-row items-center gap-2">
              {user?.displayName || "Administrator"}
              {/* Role Badge */}
              <span
                className={`text-sm text-white px-2 py-1 rounded-full ${
                  usersInfo?.role === "Admin" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {usersInfo?.role || "Admin"}
              </span>
            </h1>
            <p className="text-gray-600 text-center md:text-start">
              {user?.bio ||
                "Empowering the platform by overseeing operations and ensuring smooth functionality."}
            </p>
          </div>
        </div>
      </header>

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Scholarships Card */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Scholarships</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {scholarships?.length || "20+"}
          </p>
        </div>

        {/* Total Users Card */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {users?.length || "10+"}
          </p>
        </div>

        {/* Total Applications Card */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Applications</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {getAllApplication?.length || 0}
          </p>
        </div>

        {/* Pending Approvals Card */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <p className="text-3xl font-bold text-indigo-600">
            {getAllPendingApplication?.length || 0}
          </p>
        </div>
      </section>

      {/* Admin Functionalities Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Functionalities</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Approve or reject pending applications</li>
          <li>Manage all user roles (Admin, Moderator, User)</li>
          <li>Delete or edit scholarships</li>
          <li>Generate platform-wide reports</li>
          <li>Monitor activity logs for suspicious behavior</li>
          <li>Add or remove moderators</li>
        </ul>
        <div className="flex gap-4 mt-4">
          <Link
            to="/dashboard/shared/add-scholarship"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Scholarship
          </Link>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
            onClick={() => generateReport()}
          >
            Generate Report
          </button>
        </div>
      </section>

      {/* Footer Section */}
      {/* <footer className="mt-6 text-center text-gray-600">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
          onClick={() => userLogOut()}
        >
          Logout
        </button>
      </footer> */}
    </div>
  );
};

export default AdminProfile;
