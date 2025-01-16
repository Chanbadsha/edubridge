import React, { useEffect, useState } from "react";
import axios from "axios";
import ScholarshipCard from "../../../Shared/ScholarshipCard/ScholarshipCard";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const { isDarkMode } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/scholarships").then(({ data }) => setScholarships(data));
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-textLight" : "bg-gray-200 text-textBlack"
      }`}
    >
      {/* Section Header */}
      <section className="text-center py-12 px-4">
        <h2
          className={`text-3xl lg:text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          } leading-tight mb-6`}
        >
          Scholarships for Every Student
        </h2>
        <p
          className={`text-lg lg:text-xl max-w-6xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Discover a diverse collection of scholarships designed to support
          students from all walks of life. Whether you're an undergraduate,
          graduate, or international student, you'll find opportunities tailored
          to your specific needs and aspirations. From merit-based to need-based
          scholarships, explore options that align with your academic goals,
          career ambitions, and financial situation. Empower your educational
          journey with funding that opens doors to your future success.
        </p>
      </section>

      {/* Card Section */}
      <section className="py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Scholarships;
