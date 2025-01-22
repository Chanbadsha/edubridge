import React from "react";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useAllUser from "../../../../Hooks/AllUserInfo/useAllUser";
import UserDisplay from "./UserDisplay";

const ManageUser = () => {
  const [users, isLoading, refetch] = useAllUser();

  return (
    <div>
      {/* Section Header */}
      <div>
        <DashboardHeader
          title="User Administration Panel"
          subtitle="Empower your admin role with tools to monitor and manage users seamlessly"
        ></DashboardHeader>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {users && users.length > 0 ? (
          <table className="table w-full border border-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>User Photo</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>

                <th>Delete</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <UserDisplay
                  key={user._id || index}
                  user={user}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-10 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
