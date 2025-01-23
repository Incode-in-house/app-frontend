import React from "react";
import { ReactComponent as ArrowBottomIcon } from "../../assets/icons/arrow-bottom.svg";

export interface CountrySelectorProps {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}

export default function CountrySelector({ selectedCountry, setSelectedCountry }: CountrySelectorProps) {
  const [countries, setCountries] = React.useState<string[]>([]);

  React.useEffect(() => {
    const userLocale = navigator.language || "en-US";
    const userCountry = new Intl.DisplayNames([userLocale], { type: "region" })
      .of(userLocale.split("-")[1]?.toUpperCase() || "")
      ?.toString();

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country: { name: { common: string } }) => country.name.common).sort();

        const defaultCountry =
          userCountry && countryNames.includes(userCountry) ? userCountry : countryNames[0];
        setSelectedCountry(defaultCountry);
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, [setSelectedCountry]);

  const onChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectedCountry(value);
  };

  return (
    <div className="[&_svg]:size-5 relative">
      <select
        defaultValue={selectedCountry}
        value={selectedCountry}
        onChange={onChangeCountry}
        className="text-lg h-12 w-full px-2 appearance-none rounded-md border-2 hover:border-slate-400 focus:outline-slate-400"
        name="payment-card-layout-country"
        id="payment-card-layout-country">
        {countries.map((country) => (
          <option key={`country-selector-${country}`} value={country}>
            {country}
          </option>
        ))}
      </select>
      <ArrowBottomIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}
