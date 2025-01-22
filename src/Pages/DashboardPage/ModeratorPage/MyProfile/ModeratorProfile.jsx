import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import avatar from "../../../../assets/Logo/profile.png";
import useUserData from "../../../../Hooks/UsersData/useUserData";
import Loader from "../../../../Components/Loader/Loader";

import useScholarship from "../../../../Hooks/ScholarshipData/useScholarship";
import AllApplicationList from "../../../../Hooks/ApplicationInfo/AllApplicationList";

import useAllUser from "../../../../Hooks/AllUserInfo/useAllUser";
import PendingApplication from "../../../../Hooks/ApplicationInfo/PendingApplication";
const ModeratorProfile = () => {
  const { user, loading, userLogOut } = useAuth();
  const [getAllPendingApplication] = PendingApplication();
  const [getAllApplication] = AllApplicationList();
  const [scholarships] = useScholarship();
  const [users] = useAllUser();
  const [usersInfo] = useUserData();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={user?.photoURL || avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {user?.displayName || "Moderator"}
              {/* Role Badge */}
              <span
                className={`text-sm text-white px-2 py-1 rounded-full ${
                  usersInfo?.role === "Admin" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {usersInfo?.role || "Moderator"}
              </span>
            </h1>
            <p className="text-gray-600">
              {user?.bio ||
                "Dedicated to managing scholarships and platform integrity."}
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

      {/* Functionalities Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Moderator Functionalities
        </h2>
        <ul className="list-disc pl-6">
          <li>Review scholarship applications</li>
          <li>Approve or reject pending submissions</li>
          <li>Manage user accounts</li>
          <li>Generate reports for admin review</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="mt-6 text-center text-gray-600">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
          onClick={() => userLogOut()}
        >
          Logout
        </button>
      </footer>
    </div>
  );
};

export default ModeratorProfile;
