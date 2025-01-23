import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import PaymentDetailsForm from "@/components/PaymentDetailsForm";
import CardWrapper from "@/components/CardWrapper";
import CheckoutForm from "@/components/CheckoutForm";
import CompletePage from "@/components/CompletePage";
import ProtectedCheckoutPage from "../ProtectedCheckoutPage";

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
          <Route
            path="/checkout"
            element={<ProtectedCheckoutPage clientSecret={clientSecret} stripe={stripe} />}
          />
        </Routes>
      </CardWrapper>
    </Router>
  );
}
