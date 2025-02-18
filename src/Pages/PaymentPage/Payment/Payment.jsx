import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";
import CheckOutForm from "../CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [applicationFees, setApplicationFees] = useState(0);
  const [error, setError] = useState("");
  const { loading } = useAuth();

  useEffect(() => {
    axiosPublic
      .get(`/scholarships/${id}`)
      .then((res) => {
        const fees = res.data.application_fees;
        if (fees > 0) {
          setApplicationFees(fees);
        } else {
          setError("Invalid application fees.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch scholarship details.");
      });
  }, [id]);

  const priceInfo = {
    price: applicationFees,
    id: id,
  };

  if (loading || applicationFees <= 0) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-[calc(100vh-306px)] py-12">
      <div className="container mx-auto text-center px-6">
        {/* Page Header */}
        <h1
          className="text-4xl font-extrabold text-gray-800 mb-4"
          role="heading"
          aria-level="1"
        >
          Scholarship Payment
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Please complete your payment to proceed with your scholarship
          application.
        </p>
        {error && (
          <p className="text-red-600 font-medium bg-red-100 p-4 rounded-lg mb-6 shadow-sm">
            {error}
          </p>
        )}
      </div>

      {/* Payment Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Payment Details
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Application Fee:{" "}
          <span className="font-bold text-blue-500">${applicationFees}</span>
        </p>
        <Elements stripe={stripePromise}>
          <CheckOutForm priceInfo={priceInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
