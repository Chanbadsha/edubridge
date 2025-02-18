import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
import { RiRefund2Fill } from "react-icons/ri";

import { GiOpenBook } from "react-icons/gi";
import { BiSolidCategory } from "react-icons/bi";
import useSingeScholarReview from "../../../Hooks/ReviewInfo/useSingeScholarReview";
import useScholarship from "../../../Hooks/ScholarshipData/useScholarship";

const ScholarshipDetail = () => {
  const { loading, isDarkMode } = useAuth();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [scholarshipData, setScholarshipData] = useState(null);
  const [loadingScholarship, setLoadingScholarship] = useState(true);
  const [singleScholarshipReview, isLoading] = useSingeScholarReview(id);
  const [scholarships] = useScholarship();

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

  if (loading || loadingScholarship || isLoading) {
    return <Loader />;
  }

  if (!scholarshipData) {
    return (
      <div className="text-center text-gray-500">
        Scholarship details not available.
      </div>
    );
  }

  const sortedReview = singleScholarshipReview.sort(
    (a, b) => b.rating - a.rating
  );

  const recentScholarship = scholarships.sort(
    (a, b) => new Date(b.upload_date) - new Date(a.upload_date)
  );

  const topScholarShip = scholarships.sort((a, b) => b.rating - a.rating);

  return (
    <div className="container mx-auto p-6">
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
                        className={`flex items-center gap-1 font-medium ${
                          isDarkMode ? "text-textLight" : "text-gray-700"
                        } mb-2`}
                      >
                        <span>
                          <RiRefund2Fill />
                        </span>{" "}
                        :{" "}
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
        <div className="space-y-8">
          {/* Recent Scholarships */}
          <div>
            <h5 className="text-xl font-semibold">Recent Scholarships</h5>
            <ul className="bg-gray-100 p-6 rounded-lg shadow-md">
              {recentScholarship.slice(0, 5).map((scholarship) => (
                <li key={scholarship._id} className="mb-2">
                  <Link
                    to={`/scholarship/${scholarship._id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {scholarship.scholarship_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Scholarships */}
          <div>
            <h5 className="text-xl font-semibold">Top Scholarships</h5>
            <ul className="bg-gray-100 p-6 rounded-lg shadow-md">
              {topScholarShip.slice(0, 5).map((scholarship) => (
                <li key={scholarship._id} className="mb-2">
                  <Link
                    to={`/scholarship/${scholarship._id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {scholarship.scholarship_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* User Reviews Section */}
      {sortedReview && (
        <>
          <div className="mt-16 flex-1  w-full ">
            <h3 className="text-2xl font-bold w-full mb-6">
              What our client's say
            </h3>
            <div className="grid w-full gap-4 px-6 grid-cols-1 lg:grid-cols-2">
              {sortedReview.slice(0, 4).map((review) => (
                <div
                  key={review.id}
                  className="flex w-full  items-start mb-6 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={review.photo}
                    alt={`${review.reviewer}'s avatar`}
                    className="w-14 h-14 rounded-full object-cover mr-6"
                  />
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-800">
                      {review.reviewer}
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }, (_, index) => {
                        const fullStar = index < Math.floor(review.rating);
                        const halfStar =
                          index === Math.floor(review.rating) &&
                          review.rating % 1 >= 0.5;

                        return (
                          <svg
                            key={index}
                            className={`w-5 h-5 ${
                              fullStar
                                ? "text-yellow-500"
                                : halfStar
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        );
                      })}
                    </div>

                    <p className="text-gray-600 mt-2">{review.reviewComment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScholarshipDetail;
