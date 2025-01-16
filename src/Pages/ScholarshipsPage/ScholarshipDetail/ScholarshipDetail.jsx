import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";

const ScholarshipDetail = () => {
  const { loading, isDarkMode } = useAuth();
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
      <div className="text-center text-gray-500">
        Scholarship details not available.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* University Image */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        <img
          className="w-full h-[500px] object-cover"
          src={scholarshipData.university_img}
          alt={`${scholarshipData.university_name} campus`}
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-6 text-white">
          <h2 className="text-4xl font-bold">
            {scholarshipData.university_name}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Section */}
        <div className="col-span-2">
          <div>
            <div className="flex gap-4">
              <div className="flex-1">
                <h4 className="text-3xl font-bold mb-4">Scholarship Details</h4>
                <p className=" mb-2">
                  📍 Location:{" "}
                  <span className="font-medium">
                    {scholarshipData.university_location.city},{" "}
                    {scholarshipData.university_location.country}
                  </span>
                </p>
                <p className=" mb-2">
                  🗓️ Application Deadline:{" "}
                  <span className="font-medium text-red-500">
                    {scholarshipData.application_deadline}
                  </span>
                </p>
              </div>

              <div className="flex-1">
                {/* Rating Info */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                  <h5
                    className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? "text-textLight" : "text-textLight"
                    }`}
                  >
                    Rating
                  </h5>
                  <p
                    className={`mb-2 ${
                      isDarkMode ? "text-textLight" : "text-textLight"
                    }`}
                  >
                    ⭐ <strong>Rating:</strong>{" "}
                    {scholarshipData.rating || "Not Rated"}
                  </p>
                </div>
              </div>
            </div>
            <p className="leading-relaxed mb-6">
              {scholarshipData.scholarship_description}
            </p>
          </div>

          {/* Financial Info */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h5
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-textLight" : "text-textLight"
              }`}
            >
              Financial Information
            </h5>
            <p
              className={`mb-2 ${
                isDarkMode ? "text-textLight" : "text-textLight"
              }`}
            >
              💰 <strong>Stipend:</strong> {scholarshipData.stipend}
            </p>
            <p
              className={`mb-2 ${
                isDarkMode ? "text-textLight" : "text-textLight"
              }`}
            >
              🔧 <strong>Service Charge:</strong>{" "}
              {scholarshipData.service_charge}
            </p>
            <p
              className={`mb-2 ${
                isDarkMode ? "text-textLight" : "text-textLight"
              }`}
            >
              💵 <strong>Application Fees:</strong>{" "}
              {scholarshipData.application_fees}
            </p>
          </div>

          {/* Apply Button */}
          <a
            href={scholarshipData.apply_scholarship_button}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
          >
            Apply Now
          </a>
        </div>

        {/* Right Section */}
        <div>
          {/* Recent Scholarship */}
          <div className="mb-8">
            <h5 className="text-xl font-semibold mb-4">Recent Scholarships</h5>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-gray-600">
              🚀 Coming Soon
            </div>
          </div>

          {/* Top Scholarship */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Top Scholarships</h5>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-gray-600">
              🌟 Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
