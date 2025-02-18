import img1 from "../../assets/blog/static04.jpg";
import img2 from "../../assets/blog/static05.jpg";
import img3 from "../../assets/blog/image.png";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  const { isDarkMode } = useAuth();

  return (
    <div
      className={`min-h-[calc(100vh-306px)] py-10 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Image Section */}
        <section className="lg:col-span-5 flex gap-4">
          <div className="space-y-4">
            <img
              src={img1}
              alt="Educational journey"
              className="rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
            <img
              src={img2}
              alt="Empowering students"
              className="rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
          </div>
          <img
            src={img3}
            alt="Global opportunities"
            className="rounded-xl shadow-lg object-cover mt-4"
            loading="lazy"
          />
        </section>

        {/* Content Section */}
        <section className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-4">
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                isDarkMode
                  ? "bg-teal-700 text-teal-300"
                  : "bg-teal-100 text-teal-700"
              }`}
            >
              About Us
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Bridging the Gap Between You and Top Universities
          </h2>
          <p className="text-lg mb-4">
            Making Global Education Accessible for Everyone
          </p>
          <p className="text-base mb-6">
            Our platform is designed to simplify your scholarship journey by
            offering a curated list of programs and personalized guidance.
            EduBridge is here to help you take the first step toward a brighter
            future.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <i className="fas fa-bullseye"></i> Personalized Scholarship
                Recommendations
              </h3>
              <p className="text-gray-200 mt-4">
                Our intelligent recommendation engine matches you with
                scholarships that fit your academic aspirations, ensuring the
                best opportunities for your future.
              </p>
              <button className="mt-6 bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
                Start Your Search
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <i className="fas fa-check-circle"></i> Streamlined Application
                Process
              </h3>
              <p className="text-gray-200 mt-4">
                With EduBridge, applying for scholarships has never been easier.
                Our platform guides you every step of the way, from document
                preparation to submission.
              </p>
              <button className="mt-6 bg-white text-green-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
                Apply Now
              </button>
            </div>
          </div>

          {/* Mission Badge */}
          <div className="mt-10">
            <span
              className={`inline-flex items-center space-x-2 px-5 py-2 text-lg font-semibold rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                isDarkMode
                  ? "bg-teal-800 text-teal-300 hover:bg-teal-700"
                  : "bg-teal-100 text-teal-700 hover:bg-teal-200"
              }`}
            >
              <span>Explore Our Mission</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
