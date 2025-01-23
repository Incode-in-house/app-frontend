import React from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import SubmitButton from "../SubmitButton";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    console.log("submit");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_BASE_URL}/complete`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="checkout-form-payment-element" />
      <SubmitButton className="mt-6" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
      </SubmitButton>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
