import React from "react";

import useAuth from "../../../../Hooks/useAuth";
import avatar from "../../../../assets/Logo/profile.png";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useApplicationInfo from "../../../../Hooks/ApplicationInfo/useApplicationInfo";
import Loader from "../../../../Components/Loader/Loader";
import useScholarship from "../../../../Hooks/ScholarshipData/useScholarship";
const UserProfile = () => {
  const { user, loading, userLogOut } = useAuth();
  const [applicationList, isLoading] = useApplicationInfo();
  const [scholarships] = useScholarship();
  if (isLoading || loading) {
    return <Loader />;
  }
  const isModerator = false;
  return (
    <div>
      <DashboardHeader
        title="Account Overview"
        subtitle="View and update your personal information, application status, and preferences."
      ></DashboardHeader>

      <div className=" bg-gray-100 p-6">
        {/* Header Section */}
        <header className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-gray-600">
                Explore scholarships and track your applications seamlessly.
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold">Scholarships</h2>
            <p className="text-3xl font-bold text-indigo-600">
              {scholarships?.length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold">Applications</h2>
            <p className="text-3xl font-bold text-indigo-600">
              {applicationList.length}
            </p>
          </div>
        </section>

        {/* Functionalities Section */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isModerator ? "Moderator" : "User"} Functionalities
          </h2>

          <p>Coming Soon...</p>
        </section>

        {/* Footer Section */}
        <footer className="mt-6 text-center text-gray-600">
          <button
            onClick={() => userLogOut()}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UserProfile;
