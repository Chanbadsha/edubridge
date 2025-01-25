import { useState } from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import useScholarship from "../../../Hooks/ScholarshipData/useScholarship";
import ScholarshipCard from "../../../Shared/ScholarshipCard/ScholarshipCard";
import { Link } from "react-router-dom";

const TopScholarShip = () => {
  const [scholarships] = useScholarship();

  // Sort scholarships by application fees (low to high), then by recent upload date (most recent first)
  const sortedScholarships = scholarships.sort((a, b) => {
    if (a.application_fees === b.application_fees) {
      // Secondary sorting by recent upload (assuming 'upload_date' is a valid date string)
      return new Date(b.upload_date) - new Date(a.upload_date);
    }
    // Primary sorting by application fees
    return a.application_fees - b.application_fees;
  });

  return (
    <div className="pb-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <SectionHeader
          title="Top Global Scholarships at Your Fingertips"
          subtitle="Unlock endless opportunities to pursue your dreams at prestigious universities around the globe. Discover scholarships crafted to align with your academic goals and career aspirations, helping you achieve excellence every step of the way."
        />
      </div>

      {/* Section Body */}
      <div className="grid px-4 gap-6 py-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {sortedScholarships.slice(0, 6).map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>

      {/* View All Scholarships Button */}
      <div className="text-center mt-8">
        <Link
          to="/scholarships"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          View All Scholarships
        </Link>
      </div>
    </div>
  );
};

export default TopScholarShip;
