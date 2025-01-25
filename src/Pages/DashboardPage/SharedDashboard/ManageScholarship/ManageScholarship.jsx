import DashboardHeader from "../../../../Components/DashboardHeader/DashboardHeader";
import useScholarship from "../../../../Hooks/ScholarshipData/useScholarship";
import ScholarshipDisplay from "../ScholarshipDisplay/ScholarshipDisplay";
const ManageScholarship = () => {
  const [scholarships, isLoading, refetch] = useScholarship();
  return (
    <div>
      {/* Section Header */}
      <div>
        <DashboardHeader
          title="Manage Scholarships: Support Education"
          subtitle="Review, approve, and manage scholarship applications, contributing to a future where students are empowered to pursue their educational goals."
        ></DashboardHeader>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        {scholarships && scholarships.length > 0 ? (
          <table className="table w-full border border-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>University Name</th>
                <th>Degree</th>
                <th>Subject Name</th>
                <th>Application Fee</th>

                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {scholarships.map((scholarship, index) => (
                <ScholarshipDisplay
                  key={scholarship._id || index}
                  scholarship={scholarship}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            No applications found. Start applying to scholarships now!
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageScholarship;
