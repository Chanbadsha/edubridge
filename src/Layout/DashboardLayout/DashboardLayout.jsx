import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../../Pages/DashboardPage/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import UserApplicationEditModal from "../../Shared/Modal/UserApplicationEditModal/UserApplicationEditModal";

const DashboardLayout = () => {
  const { isDarkMode } = useAuth();
  return (
    <div className={`${isDarkMode ? "bg-gray-900 " : "bg-backgroundLight"}`}>
      <Toaster></Toaster>
      <UserApplicationEditModal></UserApplicationEditModal>
      <Dashboard></Dashboard>;
    </div>
  );
};

export default DashboardLayout;
