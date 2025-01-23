import React from "react";
import Input from "@/components/Input";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import { CREATE_PAYMENT } from "@/endpoints";
import CountrySelector from "../CountrySelector";
import { useNavigate } from "react-router-dom";

interface PaymentDetailsFormProps {
  setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PaymentDetailsForm({ setClientSecret }: PaymentDetailsFormProps) {
  const [amount, setAmount] = React.useState("");
  const [country, setCountry] = React.useState("");
  const navigate = useNavigate();
  const [amountErrorMessage, setAmountErrorMessage] = React.useState<string | null>(null);
  const [countryErrorMessage, setCountryErrorMessage] = React.useState<string | null>(null);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!amount) {
      return setAmountErrorMessage("Amount is required");
    }
    if (!country) return setCountryErrorMessage("Country is required");

    if (amount && country) {
      axios
        .post(CREATE_PAYMENT, { amount, country })
        .then(({ data }) => {
          setClientSecret(data.clientSecret);
          navigate("/checkout");
        })
        .catch((err) => console.error("Error fetching clientSecret:", err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount (in cents):
        <Input type="number" value={amount} placeholder="Input amount" onChange={onChangeAmount} />
        {amountErrorMessage && <p className="text-red-500">{amountErrorMessage}</p>}
      </label>

      <div className="mt-3 flex flex-col">
        <label htmlFor="payment-card-layout-country">Country</label>
        <CountrySelector selectedCountry={country} setSelectedCountry={setCountry} />
        {countryErrorMessage && <p className="text-red-500">{countryErrorMessage}</p>}
      </div>

      <div className="mt-6">
        <SubmitButton>Create Payment</SubmitButton>
      </div>
    </form>
  );
}
