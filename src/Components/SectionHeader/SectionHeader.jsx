import React from "react";
import useAuth from "../../Hooks/useAuth";

const SectionHeader = ({ title, subtitle }) => {
  const { isDarkMode } = useAuth();

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
            {title}
          </h2>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="divider h-[1px] bg-gray-300 mx-auto w-full"></div>
    </div>
  );
};

export default SectionHeader;
