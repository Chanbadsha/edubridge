import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../../Pages/DashboardPage/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";


const DashboardLayout = () => {
  const { isDarkMode } = useAuth();
  return (
    <div className={`${isDarkMode ? "bg-gray-900 " : "bg-backgroundLight"}`}>
      <Toaster></Toaster>
      <Dashboard></Dashboard>;
    </div>
  );
};

export default DashboardLayout;
