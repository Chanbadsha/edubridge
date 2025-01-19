import React from "react";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader/Loader";
import useApplicationInfo from "../../../../Hooks/ApplicationInfo/useApplicationInfo";
import UserApplicationDisplay from "../../../../Shared/UserApplicationList/UserApplicationDisplay";

const UserApplication = () => {
  const { user, loading } = useAuth();
  const [applicationList, isLoading] = useApplicationInfo();

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <DashboardHeader
        title="Track Your Scholarship Journey"
        subtitle="Stay updated on your scholarship applications and progress."
      />

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="table w-full border border-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Applied Degree</th>
              <th>Subject Name</th>
              <th>Application Fee</th>
              <th>Service Charge</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Cancel</th>
              <th>Review</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {applicationList.map((applicationInfo, index) => (
              <UserApplicationDisplay
                key={index}
                applicationInfo={applicationInfo}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserApplication;
