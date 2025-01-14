import React from "react";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="border-r  border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
      {/* Img Section */}
      <div className="flex-1">
        <img
          src={scholarship.university_img}
          className="w-full h-80 mb-3"
          alt="Scholarship-related visual"
        />
      </div>
      {/* Content section */}
      <div className="flex-1">
        <div className="p-4 flex  h-full flex-col pt-2">
          <div className="mb-8 ">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Members only
            </p>
            <a
              href="#"
              className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
            >
              {scholarship.university_name}
            </a>
            <p className="text-gray-700 text-sm">
              {scholarship.scholarship_description}
            </p>
          </div>
          <div className="flex items-center  flex-1 ">
            <a href="#">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={scholarship.university_logo}
                alt={`Avatar of ${scholarship.university_name}`}
              />
            </a>
            <div className="text-sm ">
              <a
                href="#"
                className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
              >
                {scholarship.university_name}
              </a>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
