import React from "react";
import photo from "../../../assets/blog/whychoose.jpg";
import useAuth from "../../../Hooks/useAuth";

const ChooseUs = () => {
  const { isDarkMode } = useAuth();

  return (
    <div className={isDarkMode ? "bg-gray-900" : "bg-white"}>
      <div
        className={`container mx-auto px-4 py-10 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {isDarkMode && (
          <div className="divider  p-0 m-0 h-[1px] mb-6 bg-white"></div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-4">
              <button
                className={`px-4 py-2 text-sm font-semibold ${
                  isDarkMode
                    ? "text-teal-300 bg-teal-700"
                    : "text-teal-700 bg-teal-100"
                } rounded-full`}
              >
                WHY CHOOSE US
              </button>
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              Creating a Gateway to{" "}
              <span className="text-teal-600">
                Global Education Opportunities
              </span>
              .
            </h2>
            <p
              className={`text-gray-600 mb-6 ${
                isDarkMode ? "text-textBlack" : ""
              }`}
            >
              EduBridge is dedicated to connecting ambitious students with
              life-changing scholarship opportunities. Whether you dream of
              studying at a prestigious institution or need financial support to
              fuel your academic aspirations, EduBridge is here to make it
              happen.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Single Feature */}
              <div
                className={`p-6 ${
                  isDarkMode ? "bg-teal-800" : "bg-teal-50"
                } rounded-lg shadow hover:shadow-lg transition-shadow duration-300`}
              >
                <h3
                  className={`flex items-center ${
                    isDarkMode ? "text-teal-300" : "text-teal-700"
                  } font-semibold text-lg mb-2`}
                >
                  🌍 Global Opportunities
                </h3>
                <p
                  className={`text-gray-600 ${
                    isDarkMode ? "text-textBlack" : ""
                  }`}
                >
                  Discover scholarships and programs from top universities
                  worldwide to help fund your education and achieve your
                  academic dreams.
                </p>
              </div>

              {/* Single Feature */}
              <div
                className={`p-6 ${
                  isDarkMode ? "bg-teal-800" : "bg-teal-50"
                } rounded-lg shadow hover:shadow-lg transition-shadow duration-300`}
              >
                <h3
                  className={`flex items-center ${
                    isDarkMode ? "text-teal-300" : "text-teal-700"
                  } font-semibold text-lg mb-2`}
                >
                  🔍 Tailored Searches
                </h3>
                <p
                  className={`text-gray-600 ${
                    isDarkMode ? "text-textBlack" : ""
                  }`}
                >
                  Discover scholarships that are perfectly matched to your
                  academic aspirations, chosen field of study, and individual
                  goals.
                </p>
              </div>

              {/* Single Feature */}
              <div
                className={`p-6 ${
                  isDarkMode ? "bg-teal-800" : "bg-teal-50"
                } rounded-lg shadow hover:shadow-lg transition-shadow duration-300`}
              >
                <h3
                  className={`flex items-center ${
                    isDarkMode ? "text-teal-300" : "text-teal-700"
                  } font-semibold text-lg mb-2`}
                >
                  💼 Flexible Options
                </h3>
                <p
                  className={`text-gray-600 ${
                    isDarkMode ? "text-textBlack" : ""
                  }`}
                >
                  Select from a wide range of scholarships tailored to your
                  financial needs, academic achievements, or personal interests.
                </p>
              </div>
              {/* Single Feature */}
              <div
                className={`p-6 ${
                  isDarkMode ? "bg-teal-800" : "bg-teal-50"
                } rounded-lg shadow hover:shadow-lg transition-shadow duration-300`}
              >
                <h3
                  className={`flex items-center ${
                    isDarkMode ? "text-teal-300" : "text-teal-700"
                  } font-semibold text-lg mb-2`}
                >
                  💸 No Hidden Fees
                </h3>
                <p
                  className={`text-gray-600 ${
                    isDarkMode ? "text-textBlack" : ""
                  }`}
                >
                  We ensure full transparency in our platform, providing the
                  support you need without any unexpected fees or hidden costs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full">
            <img
              src={photo}
              alt="Student"
              className="rounded-lg object-cover  w-full lg:w-fit shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
