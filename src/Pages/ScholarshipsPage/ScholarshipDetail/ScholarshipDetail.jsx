import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
import useScholarship from "../../../Hooks/ScholarshipData/useScholarship";
import { GiOpenBook } from "react-icons/gi";
import { BiSolidCategory } from "react-icons/bi";

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
          className="w-full h-auto sm:h-[400px] lg:h-[500px] object-cover"
          src={scholarshipData.university_img}
          alt={`${scholarshipData.university_name} campus`}
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-6 text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {scholarshipData.university_name}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Section */}
        <div className="col-span-1 lg:col-span-2">
          <div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <h4 className="text-2xl sm:text-3xl font-bold mb-4">
                  {scholarshipData?.scholarship_name}
                </h4>
                <h4 className="text-xl font-bold mb-4">Scholarship Details:</h4>
                <p className=" mb-2">
                  📍 Location:{" "}
                  <span className="font-medium">
                    {scholarshipData?.university_location.city},{" "}
                    {scholarshipData?.university_location.country}
                  </span>
                </p>
                <p className=" mb-2">
                  🗓️ Application Post date:{" "}
                  <span className="font-medium text-green-500">
                    {scholarshipData?.scholarship_post_date}
                  </span>
                </p>
                <p className=" mb-2">
                  🗓️ Application Deadline:{" "}
                  <span className="font-medium text-red-500">
                    {scholarshipData?.application_deadline}
                  </span>
                </p>
              </div>

              <div className="flex-1">
                <div className="bg-gray-100 flex flex-col md:flex-row lg:flex-col lg:items-start gap-4 py-6 px-3 rounded-lg shadow-md mb-6 md:items-center">
                  {/* Left Section: Scholarship Information */}
                  <div className="flex-1">
                    <div className="flex justify-self-start md:gap-4 flex-col md:flex-row">
                      <p
                        className={` flex gap-1 font-medium ${
                          isDarkMode ? "text-textLight" : "text-gray-700"
                        } mb-2 flex justify-center items-center`}
                      >
                        <span>
                          <GiOpenBook />
                        </span>
                        :
                        <span className="font-semibold">
                          {scholarshipData?.subject_name}
                        </span>
                      </p>

                      <p
                        className={` flex gap-1 font-medium ${
                          isDarkMode ? "text-textLight" : "text-gray-700"
                        } mb-2 flex  items-center`}
                      >
                        <span>
                          <BiSolidCategory />
                        </span>
                        :
                        <span className="font-semibold">
                          {scholarshipData?.subject_category}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p
                        className={`flex gap-1 font-medium ${
                          isDarkMode ? "text-textLight" : "text-gray-700"
                        } mb-2`}
                      >
                        📂 :{" "}
                        <span className="font-semibold capitalize">
                          {scholarshipData?.scholarship_category}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Rating */}
                  <div className="flex  items-center">
                    <div className="text-center">
                      <h5
                        className={`text-lg font-bold ${
                          isDarkMode ? "text-textLight" : "text-gray-800"
                        } mb-2`}
                      >
                        ⭐ Rating
                      </h5>
                      <p
                        className={`text-lg ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {scholarshipData?.rating ? (
                          <>
                            <span className="font-bold text-green-500">
                              {scholarshipData?.rating}
                            </span>{" "}
                            <span
                              className={`${
                                isDarkMode ? "text-textLight" : "text-gray-700"
                              }`}
                            >
                              {" "}
                              / 5
                            </span>
                          </>
                        ) : (
                          "Not Rated"
                        )}
                      </p>
                    </div>
                  </div>
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
              💰 <strong>Stipend:</strong> ${scholarshipData.stipend} per year
            </p>
            <p
              className={`mb-2 ${
                isDarkMode ? "text-textLight" : "text-textLight"
              }`}
            >
              🔧 <strong>Service Charge:</strong> $
              {scholarshipData.service_charge}
            </p>
            <p
              className={`mb-2 ${
                isDarkMode ? "text-textLight" : "text-textLight"
              }`}
            >
              💵 <strong>Application Fees:</strong> $
              {scholarshipData.application_fees}
            </p>
          </div>

          {/* Apply Button */}
          <Link
            to={`/payment/${scholarshipData._id}`}
            className="inline-block px-8 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all"
          >
            Apply Now
          </Link>
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
