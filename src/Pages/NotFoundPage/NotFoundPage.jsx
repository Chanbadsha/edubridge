import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">Oops! This page is a mystery...</p>

        <p className="text-lg mt-2">
          We couldn't find the page you're looking for.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-400 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
