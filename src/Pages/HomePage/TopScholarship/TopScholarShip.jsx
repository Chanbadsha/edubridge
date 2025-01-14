import React, { useEffect, useState } from "react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import axios from "axios";
import ScholarshipCard from "../../../Shared/ScholarshipCard/ScholarshipCard";

const TopScholarShip = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axios.get("/scholarship.json").then(({ data }) => setScholarships(data));
  }, []);
  return (
    <div>
      {/* Section Header */}
      <div>
        <SectionHeader
          title="Top Global Scholarships at Your Fingertips"
          subtitle="Unlock endless opportunities to pursue your dreams at prestigious universities around the globe. Discover scholarships crafted to align with your academic goals and career aspirations, helping you achieve excellence every step of the way."
        />
      </div>

      {/* Section Body */}
      <div className="grid gap-3 py-12 grid-cols-3 max-w-7xl mx-auto">
        {scholarships.map((scholarship) => (
          <ScholarshipCard scholarship={scholarship}></ScholarshipCard>
        ))}
      </div>
    </div>
  );
};

export default TopScholarShip;
