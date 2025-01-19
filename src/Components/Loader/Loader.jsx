import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
import useAuth from "../../Hooks/useAuth";

const Loader = () => {
  const { isDarkMode } = useAuth();
  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        isDarkMode ? "bg-gray-900" : "bg-backgroundLight"
      }`}
    >
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
