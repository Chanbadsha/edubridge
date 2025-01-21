import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import avatar from "../../../../assets/Logo/profile.png";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useApplicationInfo from "../../../../Hooks/ApplicationInfo/useApplicationInfo";
import Loader from "../../../../Components/Loader/Loader";
import useScholarship from "../../../../Hooks/ScholarshipData/useScholarship";
import UserPendingApplication from "../../../../Hooks/ApplicationInfo/UserPendingApplication";

const UserProfile = () => {
  const { user, loading, userLogOut } = useAuth();
  const [applicationList, isLoading] = useApplicationInfo();
  const [getUserPendingApplication] = UserPendingApplication();
  const [scholarships] = useScholarship();

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Account Overview"
        subtitle="View and update your personal information, application status, and preferences."
      />

      <div className="bg-gray-100 p-6">
        {/* Profile Header Section */}
        <header className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {user?.displayName || "User"}
              </h1>
              <p className="text-gray-600">
                Explore scholarships and track your applications seamlessly.
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Overview Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Scholarships Overview */}
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold">Scholarships</h2>
            <p className="text-3xl font-bold text-indigo-600">
              {scholarships?.length || 0}
            </p>
          </div>

          {/* Applications Overview */}
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold">Applications</h2>
            <p className="text-3xl font-bold text-indigo-600">
              {applicationList?.length || 0}
            </p>
          </div>
          {/* Pending Approvals Card */}
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <p className="text-3xl font-bold text-indigo-600">
              {getUserPendingApplication?.length || 0}
            </p>
          </div>
        </section>

        {/* Functionalities Section */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Functionalities</h2>
          <p className="text-gray-600">Coming Soon...</p>
        </section>

        {/* Footer Section */}
        <footer className="mt-6 text-center text-gray-600">
          <button
            onClick={userLogOut}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UserProfile;
