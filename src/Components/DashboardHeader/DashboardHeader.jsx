import React from "react";
import { Link } from "react-router-dom";

const DashboardHeader = ({
  title = "Your Applications",
  subtitle = "Track the status of your scholarship applications in real-time and stay updated on your journey to success.",
  bgColor = "bg-gradient-to-r from-indigo-500 to-blue-600",
}) => {
  return (
    <header
      className={`${bgColor} text-white py-16 px-4 sm:py-20 sm:px-6 lg:py-24 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-300">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-8 opacity-80 hover:opacity-100 transition duration-300 ease-in-out">
          {subtitle}
        </p>
        <Link
          to="/scholarships"
          className="inline-block bg-yellow-500 text-gray-800 hover:bg-yellow-400 hover:text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out"
        >
          Explore Scholarships
        </Link>
      </div>

      {/* Background Abstract Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 opacity-20 blur-lg animate-pulse"></div>
    </header>
  );
};

export default DashboardHeader;
