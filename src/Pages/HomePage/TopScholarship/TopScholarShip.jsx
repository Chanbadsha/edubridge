import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import useScholarship from "../../../Hooks/ScholarshipData/useScholarship";

import ScholarshipCard from "../../../Shared/ScholarshipCard/ScholarshipCard";

const TopScholarShip = () => {
  const [scholarships] = useScholarship();
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
      <div className="grid px-4 gap-3 py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {scholarships.map((scholarship) => (
          <ScholarshipCard scholarship={scholarship}></ScholarshipCard>
        ))}
      </div>
    </div>
  );
};

export default TopScholarShip;
