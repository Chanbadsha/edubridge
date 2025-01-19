import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
      setPaymentSuccess(true);

      setTimeout(() => {
        setPaymentSuccess(false);
      }, 10000);
    }

    setIsProcessing(false);
  };

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
        {paymentSuccess && (
          <p className="text-green-500 text-sm">
            Payment successful! Thank you for your purchase.
          </p>
        )}
        <button
          className={`btn btn-outline btn-primary px-6 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
