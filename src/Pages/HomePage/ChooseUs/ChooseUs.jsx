import React from "react";
import photo from "../../../assets/blog/whychoose.jpg";
import useAuth from "../../../Hooks/useAuth";

const ChooseUs = () => {
    const { isDarkMode } = useAuth();

    const featuredCard = [
      {
        icon: "🌍",
        title: "Global Opportunities",
        description:
          "Discover scholarships and programs from top universities worldwide to help fund your education and achieve your academic dreams.",
      },
      {
        icon: "🔍",
        title: "Tailored Searches",
        description:
          "Find scholarships perfectly matched to your academic aspirations, chosen field of study, and individual goals.",
      },
      {
        icon: "💼",
        title: "Flexible Options",
        description:
          "Select from a wide range of scholarships tailored to your financial needs, academic achievements, or personal interests.",
      },
      {
        icon: "💸",
        title: "No Hidden Fees",
        description:
          "We ensure full transparency, providing the support you need without any unexpected fees or hidden costs.",
      },
    ];

    const stats = [
      {
        title: "Scholarships Awarded",
        icon: "🎓",
        value: "10K+",
        desc: "Empowering students worldwide since 2020.",
      },
      {
        title: "Universities Partnered",
        icon: "🏫",
        value: "5K+",
        desc: "Collaboration with top institutions globally.",
      },
      {
        title: "New Registrations",
        icon: "📋",
        value: "12K+",
        desc: "Join thousands of learners this month.",
      },
      {
        title: "Student Success Rate",
        icon: "🌟",
        value: "98%",
        desc: "Helping students achieve their academic dreams.",
      },
    ];
    const containerClass = isDarkMode
      ? "bg-gray-900 text-white"
      : "bg-white text-gray-900";
    const cardClass = isDarkMode
      ? "bg-teal-800 text-teal-300"
      : "bg-teal-50 text-teal-700";

    return (
      <div className={containerClass}>
        <div className="container mx-auto px-4 py-10">
          {/* Divider for Dark Mode */}
          {isDarkMode && <div className="divider h-[1px] mb-6 bg-white"></div>}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-4">
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-full ${
                    isDarkMode
                      ? "bg-teal-700 text-teal-300"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  WHY CHOOSE US
                </button>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Creating a Gateway to{" "}
                <span className="text-teal-600">
                  Global Education Opportunities
                </span>
                .
              </h2>
              <p className="text-base mb-6">
                EduBridge is dedicated to connecting ambitious students with
                life-changing scholarship opportunities. Whether you dream of
                studying at a prestigious institution or need financial support
                to fuel your academic aspirations, EduBridge is here to make it
                happen.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredCard.map((feature, index) => (
                  <div
                    key={index}
                    className={`${cardClass} p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300`}
                  >
                    <h3 className="flex items-center font-semibold text-lg mb-2">
                      {feature.icon} {feature.title}
                    </h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full">
              <img
                src={photo}
                alt="Student"
                className="rounded-lg object-cover w-full lg:w-fit shadow-md"
              />
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="bg-blue-600 shadow py-12 mt-10">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex shadow flex-col items-center text-center space-y-3"
                >
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div> */}

          <div
            className={`stats mt-12 stats-vertical grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:stats-horizontal gap-4 w-full p-8 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`stat p-6 flex flex-col justify-center items-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                }`}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div
                  className={`stat-value text-4xl font-extrabold ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`stat-title font-semibold text-lg mt-2  ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  } `}
                >
                  {stat.title}
                </div>
                <div className="stat-desc text-gray-400 text-sm mt-1">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ChooseUs;
