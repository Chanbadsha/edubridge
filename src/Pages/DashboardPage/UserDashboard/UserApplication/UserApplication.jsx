import React from "react";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader/Loader";
import useApplicationInfo from "../../../../Hooks/ApplicationInfo/useApplicationInfo";
import UserApplicationDisplay from "../../../../Shared/UserApplicationList/UserApplicationDisplay";

const UserApplication = () => {
  const { user, loading } = useAuth();
  const [applicationList, isLoading, refetch] = useApplicationInfo();

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

      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {applicationList && applicationList.length > 0 ? (
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
                <th>Details</th>
                <th>Edit</th>
                <th>Cancel</th>
                <th>Review</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {applicationList.map((applicationInfo, index) => (
                <UserApplicationDisplay
                  key={applicationInfo._id || index}
                  applicationInfo={applicationInfo}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            No applications found. Start applying to scholarships now!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApplication;
