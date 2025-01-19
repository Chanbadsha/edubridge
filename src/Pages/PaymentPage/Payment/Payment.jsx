import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/Axios/AxiosPublic/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";

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

  if (loading || applicationFees <= 0) {
    return <Loader />;
  }

  const priceInfo = {
    price: applicationFees,
    id: id,
  };

  return (
    <div className="bg-white min-h-[calc(100vh-306px)] py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1
          className="text-2xl font-semibold mb-4"
          role="heading"
          aria-level="1"
        >
          Scholarship Payment
        </h1>
        <p className="mb-8 text-gray-600">
          Complete your payment for scholarship application fees.
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="max-w-3xl mx-auto">
        <Elements stripe={stripePromise}>
          <CheckOutForm priceInfo={priceInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
