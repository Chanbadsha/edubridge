import React from "react";
import useUserData from "../../../../Hooks/UsersData/useUserData";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader/Loader";

const AdminProfile = ({ role }) => {
  const { user, loading } = useAuth();
  const userInfo = useUserData();
  const userData = userInfo[0];
  if (loading) {
    return <Loader />;
  }
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center flex-col md:flex-row justify-center text-center space-y-5 md:space-y-0 space-x-4">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-gray-600">
              {isAdmin
                ? "Oversees platform operations and ensures a seamless experience for all users."
                : "Facilitates scholarship approvals and maintains platform standards."}
            </p>
          </div>
        </div>
      </header>

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-indigo-600">1,234</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Scholarships</h2>
          <p className="text-3xl font-bold text-indigo-600">567</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Applications</h2>
          <p className="text-3xl font-bold text-indigo-600">3,890</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <p className="text-3xl font-bold text-indigo-600">45</p>
        </div>
      </section>

      {/* Functionalities Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Functionalities</h2>
        <p>Coming Soon...</p>
      </section>

      {/* Footer Section */}
      <footer className="mt-6 text-center text-gray-600">
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </footer>
    </div>
  );
};

export default AdminProfile;
