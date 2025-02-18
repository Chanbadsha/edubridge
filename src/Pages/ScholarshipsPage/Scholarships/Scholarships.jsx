import { useState } from "react";
import ScholarshipCard from "../../../Shared/ScholarshipCard/ScholarshipCard";
import useAuth from "../../../Hooks/useAuth";
import useScholarship from "../../../Hooks/ScholarshipData/useScholarship";
import Loader from "../../../Components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const Scholarships = () => {
  const { isDarkMode, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  const [scholarships] = useScholarship();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(""); // Sorting state

  // Filtered Scholarships
  const filteredScholarships = scholarships.filter((scholarship) => {
    const query = searchQuery.toLowerCase();
    return (
      scholarship?.scholarship_name.toLowerCase().includes(query) ||
      scholarship?.university_name.toLowerCase().includes(query) ||
      scholarship?.scholarship_degree.toLowerCase().includes(query)
    );
  });

  // Sorting Functionality
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortType === "latest_post") {
      return new Date(b.scholarship_post_date) - new Date(a.scholarship_post_date);
    }
    if (sortType === "earliest_deadline") {
      return new Date(a.application_deadline) - new Date(b.application_deadline);
    }
    return 0;
  });

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-textLight" : "bg-gray-200 text-textBlack"
      }`}
    >
      <Helmet>
        <title>EduBridge || Scholarships</title>
      </Helmet>

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
          to your specific needs and aspirations.
        </p>
      </section>

      {/* Search & Sort Section */}
      <section className="mb-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Scholarship Name, University, or Degree"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-grow px-4 py-2 border rounded-lg text-lg ${
              isDarkMode
                ? "bg-gray-800 text-gray-200 border-gray-600"
                : "bg-white text-gray-700 border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          <button
            onClick={() => setSearchQuery("")}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Clear
          </button>

          {/* Sorting Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className={`px-4 py-2 border rounded-lg text-lg ${
              isDarkMode
                ? "bg-gray-800 text-gray-200 border-gray-600"
                : "bg-white text-gray-700 border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <option value="">Sort By</option>
            <option value="latest_post">Latest Post Date</option>
            <option value="earliest_deadline">Earliest Deadline</option>
          </select>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section className="lg:py-6 px-4">
        {sortedScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto">
            {sortedScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                className="min-h-[350px] flex flex-col"
              />
            ))}
          </div>
        ) : (
          <p
            className={`text-center text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No scholarships found matching your search criteria.
          </p>
        )}
      </section>
    </div>
  );
};

export default Scholarships;
