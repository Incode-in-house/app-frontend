import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PaymentDetailsForm from "@/components/PaymentDetailsForm";
import CardWrapper from "@/components/CardWrapper";
import CheckoutForm from "@/components/CheckoutForm";
import CompletePage from "@/components/CompletePage";

export default function Layout() {
  const [stripe, setStripe] = React.useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY)
      .then((data) => setStripe(data))
      .catch((err) => console.log("Error loading Stripe:", err));
  }, []);

  return (
    <Router>
      <CardWrapper>
        <Routes>
          <Route path="/" element={<PaymentDetailsForm setClientSecret={setClientSecret} />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>

        {clientSecret && (
          <Elements
            options={{ clientSecret, appearance: { theme: "stripe" }, loader: "auto" }}
            stripe={stripe}>
            <Routes>
              <Route path="/checkout" element={<CheckoutForm />} />
            </Routes>
          </Elements>
        )}
      </CardWrapper>
    </Router>
  );
}
