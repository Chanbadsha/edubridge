import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecret from "../../../Hooks/Axios/AxiosSecret/useAxiosSecret";

import useUserData from "../../../Hooks/UsersData/useUserData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader/Loader";

const CheckOutForm = ({ priceInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecret = useAxiosSecret();
  const navigate = useNavigate();
  const [usersInfo] = useUserData();

  if (loading || priceInfo.price < 1) {
    return <Loader></Loader>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage("Please enter your card details.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
    }

    setIsProcessing(false);

    //   Confirm Payment Method
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: usersInfo.name,
            email: usersInfo.email,
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error", confirmError);
      setErrorMessage(confirmError.message);
    } else {
      console.log("PaymentIntent", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);

        setTransactionId(paymentIntent.id);
        toast.success(" Payment successful!");
        navigate(`/apply/${priceInfo.id}`);
        setTimeout(() => {
          setPaymentSuccess(false);
          setTransactionId("");
        }, 10000);
      }
    }
  };

  useEffect(() => {
    axiosSecret
      .post("/create-payment-intent", priceInfo)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecret]);
  //   console.log(clientSecret);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          className={`btn btn-outline btn-primary px-6 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
