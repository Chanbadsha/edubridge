import React from "react";
import { Link } from "react-router-dom";

const DashboardHeader = ({
  title = "Your Applications",
  subtitle = "Track the status of your scholarship applications in real-time and stay updated on your journey to success.",
  bgColor = "bg-gradient-to-r from-indigo-500 to-blue-600",
}) => {
  return (
    <header
      className={`${bgColor} text-white py-20 px-6 relative overflow-hidden`}
    >
      <div className="w-full mx-auto text-center z-10 relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-300">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium mb-8 opacity-80 hover:opacity-100 transition duration-300 ease-in-out">
          {subtitle}
        </p>
        <Link
          to="/scholarships"
          className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 hover:text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out"
        >
          Explore Scholarships
        </Link>
      </div>

      {/* Background Abstract Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 opacity-20 blur-lg animate-pulse"></div>
    </header>
  );
};

export default DashboardHeader;
