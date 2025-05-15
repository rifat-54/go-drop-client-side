import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./checkout.css";
import toast from "react-hot-toast";

const CheckOutFrom = ({ id, data, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // console.log(data);

  useEffect(() => {
    paymentIntent();
  }, [id]);

  const paymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", { id });
      // console.log('payment intent->>',data);
      setClientSecret(data?.clientSecret);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(true);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(true);
      return console.log("[error]", error);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
    }

    // confrim payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user.email,
        },
      },
    });

    console.log(paymentIntent);

    const purchaseInfo = {
      email: user?.email,
      name: user?.displayName,
      parcelId: id,
      deliveryManId: data?.deliveryMan?.id,
      price: data?.price,

      tranjectionId: paymentIntent?.id,
      date: new Date(),
    };

    if (paymentIntent.status === "succeeded") {
      console.log(purchaseInfo);
      try {
        const { data } = await axiosSecure.post(`/payment/${id}`, purchaseInfo);
        console.log(data);

        if (data?.insertedId){
            toast.success("Succesfully Payed!");

            navigate('/dashboard/my-parcel')
        } 
      } catch (error) {
        // console.log(error);
      } finally {
        setProcessing(false);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <div className="flex gap-3 justify-evenly">
          <button
            className="btn bg-[#6DC5D1] text-white"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            // label={`Pay ${purchaseInfo.price || 0}$`}
          >
            Pay ${price}
          </button>
          <Link to={'/dashboard/my-parcel'} className="bg-red-400 btn text-white">Cencel</Link>
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
