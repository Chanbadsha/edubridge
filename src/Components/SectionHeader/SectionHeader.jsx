import React from "react";
import useAuth from "../../Hooks/useAuth";

const SectionHeader = ({ title, subtitle }) => {
  const { isDarkMode } = useAuth();
  return (
    <div
      className={`${
        isDarkMode
          ? "bg-gray-900 text-textBlack"
          : "bg-backgroundLight text-textLight"
      }`}
    >
      <div className="max-w-7xl justify-center gap-8 items-center py-12 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold leading-tight">{title}</h2>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <p className="text-lg leading-relaxed">{subtitle}</p>
        </div>
      </div>
      <div className="divider h-[1px] bg-gray-300 my-0"></div>
    </div>
  );
};

export default SectionHeader;
