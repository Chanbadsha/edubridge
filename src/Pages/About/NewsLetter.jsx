import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const { isDarkMode } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.email.value) {
      return toast.error("Please input an email first");
    }
    toast.success("Thanks for subscribing to our newsletter");
    e.target.reset();
  };

  return (
    <div>
      {/* Newsletter Section */}
      <div
        className={`py-16 px-6 ${
          isDarkMode ? "bg-teal-700 text-white" : "bg-teal-500 text-white"
        } transition-all duration-300`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-4">
            Stay Updated with EduBridge
          </h2>
          <p className="text-base  md:text-xl mb-6">
            Never miss out on the latest scholarships, opportunities, and news.
            Subscribe to our newsletter and receive tailored recommendations
            directly to your inbox.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`p-3 rounded-lg w-80 focus:outline-none placeholder-gray-500 ${
                  isDarkMode
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-white text-black placeholder-gray-500"
                }`}
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg text-white hover:bg-blue-700 transition ${
                  isDarkMode ? "bg-blue-500" : "bg-blue-600"
                }`}
              >
                Subscribe
              </button>
            </div>
          </form>
          <p className="mt-4 text-xs sm:text-sm text-gray-200">
            We value your privacy. You can unsubscribe at any time, and we
            promise never to share your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
