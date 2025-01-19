import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import avatar from "../../../../assets/Logo/profile.png";
import useUserData from "../../../../Hooks/UsersData/useUserData";
import Loader from "../../../../Components/Loader/Loader";
import useApplicationInfo from "../../../../Hooks/ApplicationInfo/useApplicationInfo";
const ProfilePage = ({ role }) => {
  const { user, loading } = useAuth();
  const [applicationList] = useApplicationInfo();
  if (loading) {
    return <Loader />;
  }
  const [isModerator, setIsModerator] = useState(false);
  //   console.log(user);
  const userInfo = useUserData();
  console.log(userInfo.role);

  useEffect(() => {
    if (userInfo.role === "Moderator") {
      return setIsModerator(true);
    }
    setIsModerator(false);
  }, [userInfo]);

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
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-gray-600">
              {isModerator
                ? "Facilitates scholarship approvals and maintains platform standards."
                : "Explore scholarships and track your applications seamlessly."}
            </p>
          </div>
        </div>
      </header>

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Scholarships</h2>
          <p className="text-3xl font-bold text-indigo-600">567</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Applications</h2>
          <p className="text-3xl font-bold text-indigo-600">3,890</p>
        </div>
        {isModerator && (
          <>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold">Pending Approvals</h2>
              <p className="text-3xl font-bold text-indigo-600">45</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold">Flagged Content</h2>
              <p className="text-3xl font-bold text-indigo-600">12</p>
            </div>
          </>
        )}
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
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </footer>
    </div>
  );
};

export default ProfilePage;
