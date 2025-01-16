import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
// Sample Data (Can be passed as props or fetched from an API)
// const scholarshipData = {
//   university_name: "Massachusetts Institute of Technology (MIT)",
//   university_logo:
//     "https://i.ibb.co.com/bWYwJ7n/Massachusetts-Institute-of-Technology-MIT-logo1.jpg",
//   university_img:
//     "https://i.ibb.co.com/NjwY9pj/Massachusetts-Institute-of-Technology-MIT-1.jpg",
//   scholarship_category: "Graduate",
//   university_location: {
//     country: "United States",
//     city: "Cambridge",
//   },
//   application_deadline: "2025-02-20",
//   subject_name: "Engineering",
//   scholarship_description:
//     "MIT's Engineering Graduate Scholarship provides a generous financial award to students pursuing an advanced degree in Engineering, with a particular focus on Robotics and AI. The scholarship aims to foster innovation and research in emerging technologies by helping students with their tuition fees and living expenses while contributing to MIT’s global reputation as a leader in engineering education.",
//   stipend: "$35,000 per year",
//   post_date: "2025-01-12",
//   service_charge: "$55",
//   application_fees: "$80",
//   apply_scholarship_button: "https://apply.mit.edu",
//   reviews: [
//     {
//       reviewer_image: "https://example.com/reviewer1.jpg",
//       reviewer_name: "Alice Johnson",
//       review_date: "2025-01-15",
//       rating: 5,
//       comments:
//         "This scholarship is a fantastic opportunity for anyone looking to pursue advanced studies in Engineering!",
//     },
//     {
//       reviewer_image: "https://example.com/reviewer2.jpg",
//       reviewer_name: "Robert Smith",
//       review_date: "2025-01-10",
//       rating: 4,
//       comments:
//         "A great scholarship with great support, but the application process could be a bit smoother.",
//     },
//   ],
// };

const ScholarshipDetail = () => {
  const { loading } = useAuth();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const [scholarshipData, setScholarshipData] = useState(null);
  const [loadingScholarship, setLoadingScholarship] = useState(true);

  useEffect(() => {
    const fetchScholarshipData = async () => {
      try {
        const response = await axiosPublic.get(`/scholarships/${id}`);
        setScholarshipData(response.data);
      } catch (error) {
        console.error("Error fetching scholarship data", error);
      } finally {
        setLoadingScholarship(false);
      }
    };

    fetchScholarshipData();
  }, [id, axiosPublic]);

  if (loading || loadingScholarship) {
    return <Loader />;
  }

  if (!scholarshipData) {
    return (
      <div className="text-center">Scholarship details not available.</div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* University Image */}
      <div className="w-full">
        <img
          className="w-full h-[500px] object-cover rounded-md"
          src={scholarshipData.university_img}
          alt={`${scholarshipData.university_name} campus`}
        />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Section */}
        <div className="col-span-2">
          {/* University Name and Details */}
          <h4 className="text-3xl font-bold mb-4">
            {scholarshipData.university_name}
          </h4>
          <p className="text-gray-500 mb-2">
            Location: {scholarshipData.university_location.city},{" "}
            {scholarshipData.university_location.country}
          </p>
          <p className="text-gray-500 mb-4">
            Application Deadline:{" "}
            <span className="font-medium text-red-500">
              {scholarshipData.application_deadline}
            </span>
          </p>
          <p className="mb-6">{scholarshipData.scholarship_description}</p>

          {/* Financial Info */}
          <div className="mb-6">
            <p>
              <strong>Stipend:</strong> {scholarshipData.stipend}
            </p>
            <p>
              <strong>Service Charge:</strong> {scholarshipData.service_charge}
            </p>
            <p>
              <strong>Application Fees:</strong>{" "}
              {scholarshipData.application_fees}
            </p>
          </div>

          {/* Apply Button */}
          <a
            href={scholarshipData.apply_scholarship_button}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Now
          </a>
        </div>

        {/* Right Section */}
        <div>
          {/* Recent Scholarship */}
          <div className="mb-6">
            <h5 className="text-xl font-semibold mb-4">Recent Scholarship</h5>
            <div className="bg-gray-100 p-4 rounded-md">Coming Soon</div>
          </div>

          {/* Top Scholarship */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Top Scholarship</h5>
            <div className="bg-gray-100 p-4 rounded-md">Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
