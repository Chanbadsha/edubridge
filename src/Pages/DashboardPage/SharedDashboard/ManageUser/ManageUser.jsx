import React, { useState } from "react";
import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useAllUser from "../../../../Hooks/AllUserInfo/useAllUser";
import UserDisplay from "./UserDisplay";

const ManageUser = () => {
  const [users, isLoading, refetch] = useAllUser();
  const [filterRole, setFilterRole] = useState("All");

  // Filtered Users
  const filteredUsers =
    filterRole === "All"
      ? users
      : users.filter((user) => user.role === filterRole);

  return (
    <div>
      {/* Section Header */}
      <div className="">
        <DashboardHeader
          title="User Administration Panel"
          subtitle="Empower your admin role with tools to monitor and manage users seamlessly"
        />
      </div>
      {/* Filter Dropdown */}
      <div className=" my-2 text-right">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="select select-bordered select-sm w-full max-w-xs"
        >
          <option value="All">All User</option>
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="User">User</option>
        </select>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {filteredUsers && filteredUsers.length > 0 ? (
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
              {filteredUsers.map((user, index) => (
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
          <div className="text-center mt-10 text-gray-500">
            No users found for the selected role.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
