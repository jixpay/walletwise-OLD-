"use client";
import { error, success } from "@/redux/reducers/notification_slice";
import { create_order } from "@/redux/reducers/order_slice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import convertToSubcurrency from "@/utilities/convertToSubcurrency";
import CheckoutPage from "../CheckoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface CheckOutCartModalProps {
  setCheckOut: React.Dispatch<React.SetStateAction<boolean>>;
  cart_id: number;
  total: number;
}

export default function CheckOutCartModal({
  setCheckOut,
  cart_id,
  total,
}: CheckOutCartModalProps) {
  const [mop, setMop] = useState("CASH-ON-DELIVERY");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const Loader = () => {
    return (
      <div className="bg-black opacity-75 w-full h-full absolute inset-0 flex flex-col text-white justify-center items-center">
        <Image src={"/icons/loading.svg"} alt="" width={70} height={70} />
        <h1>Please wait</h1>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-80 flex justify-center items-center z-20 p-[1rem]">
      <div className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/4 p-2 space-y-2 relative">
        {loading && <Loader />}
        <div className="bg-gray-400 h-[75px] text-white flex justify-center items-center text-2xl"></div>
        <div className="flex gap-2">
          <h1 className="w-full">MODE OF PAYMENT</h1>
          <select
            title="MODE OF PAYMENT"
            disabled={isPaid}
            className="border-b border-black w-full"
            defaultValue={mop}
            onChange={(e) => setMop(e.target.value)}
          >
            <option value={"CASH-ON-ELIVERY"}>CASH ON DELIVERY</option>
            <option value={"PAY-ONLINE"}>PAYONLINE</option>
          </select>
        </div>
        {mop === "PAY-ONLINE" && (
          <>
            {isPaid ? (
              <div className="bg-green-300 py-4">
                <h1 className="text-white text-base text-center">
                  PAYMENT VERIFIED
                </h1>
              </div>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubcurrency(total),
                  currency: "usd",
                }}
              >
                <CheckoutPage
                  amount={total}
                  setIsPaid={setIsPaid}
                  cart_id={cart_id}
                />
              </Elements>
            )}
          </>
        )}
        <input
          type="text"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="destination"
          onChange={(e) => setDestination(e.target.value)}
        />
        <textarea
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="(optional custom message)"
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-black text-white text-base w-full p-1"
            onClick={() => {
              if (isPaid || mop === "CASH-ON-DELIVERY") {
                dispatch(
                  create_order({
                    mode_of_payment: mop,
                    destination,
                    message,
                    cart_id,
                  })
                ).then((res: any) => {
                  if (res.error) {
                    dispatch(error(res.error.message));
                  } else {
                    setCheckOut(false);
                    dispatch(success("Order has been created!"));
                  }
                });
              } else {
                dispatch(error("PAYMENT UNVERIRIED"));
              }
            }}
          >
            PLACE ORDER
          </button>
          <button
            className="bg-black text-white text-base w-full p-1"
            onClick={() => setCheckOut(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
