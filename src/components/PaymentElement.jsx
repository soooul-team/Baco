import React, { useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/components/CheckoutForm";
import { Spinner } from "@chakra-ui/react";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentElement() {
  const initialized = useRef(false);
  console.log("=============PaymentElement=============");
  const [clientSecret, setClientSecret] = React.useState("");

  useEffect(() => {
    function fetchBusinesses() {
      // React.useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      if (!initialized.current) {
        initialized.current = true;
        fetch("/api/v1/payment/create_payment_intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
        // }, []);
      }
    }

    fetchBusinesses();
  }, []);
  // ink: "#141414",
  // washi: "#F9F9F0",
  // dampWashi: "#EBEBE1",
  // off: "#3B3B38",
  // error: "#FF6928",
  const appearance = {
    theme: "stripe",
    labels: "floating",
    variables: {
      colorPrimary: "#F9F9F0",
      colorBackground: "#F9F9F0",
      colorText: "#3B3B38",
      colorDanger: "#F9F9F0",
      fontFamily: "DM Mono, system-ui, sans-serif",
      fontSizeBase: "24px",
      spacingUnit: "4px",
      fontWeightNormal: "400",
      spacingGridRow: "56px",
      spacingGridColumn: "24px",
      borderRadius: "0px",
      colorLogoTab: "#3B3B38",
      // See history possible variables below
    },
    rules: {
      ".TabIcon": {
        fill: "#3B3B3880",
      },
      ".TabIcon--selected": {
        fill: "#3B3B38",
      },
      ".TabLabel": {
        color: "#3B3B3880",
      },
      ".TabLabel--selected": {
        color: "#3B3B38",
      },
      ".Input": {
        border: "",
        borderBottom: "1px solid #3B3B38",
        boxShadow: "",
      },
      ".Input:focus": {
        border: "",
        borderBottom: "1px solid #3B3B38",
        boxShadow: "",
      },
      ".Input::placeholder": {
        color: "#3B3B3880",
        fontSize: "20px",
      },
      ".Label--resting": {
        color: "#3B3B3880",
        // fontSize: "20px",
      },
      ".Label--floating": {
        color: "#3B3B3880",
        // fontSize: "20px",
      },
      ".Dropdown": {
        color: "#3B3B3880",
        // fontSize: "20px",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="">
      {!clientSecret ? (
        <div className="flex h-full w-full justify-center">
          <Spinner boxSize="28" />
        </div>
      ) : (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
