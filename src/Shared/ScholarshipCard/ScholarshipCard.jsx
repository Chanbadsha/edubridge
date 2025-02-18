import React from "react";
import useAuth from "../../Hooks/useAuth";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { TbCategory } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";

const ScholarshipCard = ({ scholarship }) => {
  const { isDarkMode } = useAuth();

return (
  <div
    className={`relative shadow-lg border h-full rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 flex flex-col ${
      isDarkMode
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 border-gray-700 shadow-gray-900"
        : "bg-gradient-to-br from-white to-gray-100 text-gray-900 border-gray-300 shadow-gray-300"
    }`}
  >
    {/* Image Section */}
    <div className="relative">
      <img
        src={scholarship.university_img}
        className="w-full h-64 object-cover"
        alt={`${scholarship.university_name} campus`}
      />
      <div className="absolute top-3 right-3 flex flex-wrap gap-2">
        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 rounded-full text-xs lg:text-sm text-white font-semibold shadow-md">
          {scholarship.subject_name}
        </span>
      </div>
      <div className="absolute  top-3 left-3 flex flex-wrap gap-2">
        <span className="bg-gradient-to-r from-teal-400 to-blue-500 px-4 py-2 rounded-full text-xs lg:text-sm text-white font-semibold shadow-lg transform transition-transform duration-300 hover:scale-105  hover:shadow-xl">
          {scholarship.rating}
        </span>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-5 flex flex-1 flex-col justify-between space-y-4">
      {/* Header with Logo and Name */}
      <div className="flex items-center gap-3">
        <img
          src={scholarship.university_logo}
          alt={`${scholarship.university_name} logo`}
          className="w-10 h-10 rounded-full object-contain"
        />
        <h3 className="text-lg font-bold hover:text-indigo-600 transition-colors">
          <Link to="/">{scholarship.university_name}</Link>
        </h3>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-y-2 text-sm ">
        <div className="flex items-center gap-2">
          <BiWorld />
          <span>{scholarship.university_location.country}</span>
        </div>
        <div className="flex items-center gap-2">
          <TbCategory />
          <span>{scholarship.scholarship_degree}</span>
        </div>
        <div className="flex items-center gap-2">
          <AiFillDollarCircle />

          <span>Fees: {scholarship.application_fees}</span>
        </div>
        <div className="flex items-center gap-2">
          <BsCalendar2DateFill />
          <span className="text-xs">Deadline: {scholarship.application_deadline}</span>
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {scholarship.scholarship_description.slice(0, 120)}...
      </p>

      <div className="mt-4">
        <Link
          to={`/scholarship/${scholarship._id}`}
          className={`w-full inline-block text-center px-6 py-2 text-sm font-semibold rounded-lg shadow-md transition-all ${
            isDarkMode
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);
};

export default ScholarshipCard;
