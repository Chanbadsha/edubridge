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

  const filteredScholarships = scholarships.filter((scholarship) => {
    const query = searchQuery.toLowerCase();
    return (
      scholarship?.scholarship_name.toLowerCase().includes(query) ||
      scholarship?.university_name.toLowerCase().includes(query) ||
      scholarship?.scholarship_degree.toLowerCase().includes(query)
    );
  });

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-textLight" : "bg-gray-200 text-textBlack"
      }`}
    >
      <Helmet>
        <title>Edubrige || Scholarships</title>
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

      {/* Search Bar */}
      <section className="text-center mb-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by Scholarship Name, University, or Degree"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg text-lg ${
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
        </div>
      </section>

      {/* Card Section */}
      <section className="py-10 px-4">
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
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
