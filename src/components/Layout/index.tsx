import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import PaymentDetailsForm from "../PaymentDetailsForm";
import CardWrapper from "../CardWrapper";
import CompletePage from "../CompletePage";
import ProtectedCheckoutPage from "../ProtectedCheckoutPage";

export default function Layout() {
  const [stripe, setStripe] = React.useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY as string)
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
