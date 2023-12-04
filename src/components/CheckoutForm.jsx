import React, { useContext } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Spinner, useToast } from "@chakra-ui/react";
import { MarketContext } from "./MarketProvider";
import Alert from "./Alert/Alert";

export default function CheckoutForm() {
  const { updateGlobalUserInfo } = useContext(MarketContext);
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          toast({
            render: () => <Alert>Payment succeeded!</Alert>,
            position: "top",
            duration: 8000,
          });
          break;
        case "processing":
          toast({
            render: () => <Alert>Your payment is processing.</Alert>,
            position: "top",
            duration: 8000,
          });
          break;
        case "requires_payment_method":
          toast({
            render: () => (
              <Alert>Your payment was not successful, please try again.</Alert>
            ),
            position: "top",
            duration: 8000,
          });
          break;
        default:
          toast({
            position: "bottom-right",
            title: "Purchase request error.",
            // description: "We've created your account for you.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          break;
      }
    });
    updateGlobalUserInfo();
  }, [stripe]);

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://yohaku.club/purchase",
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.closeAll();
      toast({
        render: () => <Alert>{error.message}</Alert>,
        position: "top",
        duration: 8000,
      });
    } else {
      toast.closeAll();
      toast({
        render: () => <Alert>An unexpected error occurred.</Alert>,
        position: "bottom",
        duration: 8000,
      });
      console.log("error");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <div className="flex w-full items-center justify-end pt-16">
        {/* <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`h-[60px] w-2/5 rounded-full bg-ink px-8 py-4 uppercase text-washi`}
        >
          <span id="button-text">
            {isLoading ? <Spinner /> : "RESERVE NOW"}
          </span>
        </button> */}
      </div>
    </form>
  );
}
