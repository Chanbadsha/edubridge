import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";

const Contact = () => {
  const { isDarkMode } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call or submission logic here
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      className={`py-12 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
  
      <div
        className={`container mx-auto py-16 px-8 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        } rounded-lg shadow-lg`}
      >
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="flex-1">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-teal-500">
                Get in Touch
              </h2>
              <p className="text-base sm:text-lg text-center max-w-[80%] mx-auto">
                Reach out to us for inquiries, support, or feedback. We're here
                to help!
              </p>
            </div>
            <div
              className={`flex-1 p-6 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white shadow-lg"
              }`}
            >
              <div className="space-y-6 py-6">
                {/* Address */}
                <div className="flex items-center gap-4">
                  <span className="bg-teal-200 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-teal-600" size={24} />
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium">
                      Our Address
                    </h4>
                    <p className="text-lg sm:text-xl font-semibold">
                      Zigatola, Dhanmondi
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
                {/* Contact Info */}
                <div className="flex items-center gap-4">
                  <span className="bg-teal-200 p-3 rounded-full">
                    <FaPhoneAlt className="text-teal-600" size={24} />
                  </span>
                  <div>
                    <p className="text-base sm:text-lg">Contact</p>
                    <p className="text-lg sm:text-xl font-semibold">
                      +8801401213135
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      support@edubridge.com
                    </p>
                  </div>
                </div>
                {/* Operating Hours */}
                <div className="flex items-center gap-4">
                  <span className="bg-teal-200 p-3 rounded-full">
                    <IoIosTimer className="text-teal-600" size={24} />
                  </span>
                  <div>
                    <p className="text-base sm:text-lg">Hours of Operation</p>
                    <p className="text-lg sm:text-xl">
                      Mon - Fri: 9:00am to 5:00pm
                    </p>
                    <p className="text-sm sm:text-base">
                      [2nd Saturday Holiday]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`flex-1 p-8 rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } transition-all duration-300`}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-teal-500">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-medium text-base sm:text-lg mb-3"
                  >
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full p-4 rounded-xl focus:outline-none transition duration-300 ease-in-out ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    required
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-base sm:text-lg mb-3"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full p-4 rounded-xl focus:outline-none transition duration-300 ease-in-out ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    required
                  />
                </div>
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-medium text-base sm:text-lg mb-3"
                  >
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full p-4 rounded-xl focus:outline-none transition duration-300 ease-in-out ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    required
                  />
                </div>
                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block font-medium text-base sm:text-lg mb-3"
                  >
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className={`w-full p-4 rounded-xl focus:outline-none transition duration-300 ease-in-out ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-medium text-base sm:text-lg mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className={`w-full p-4 rounded-xl focus:outline-none transition duration-300 ease-in-out ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-semibold text-white ${
                  isDarkMode
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "bg-teal-600 hover:bg-teal-700"
                } transition duration-300 ease-in-out flex items-center justify-center gap-3`}
              >
                Send Message <IoSend size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
