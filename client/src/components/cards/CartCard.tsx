"use client";
import { Cart } from "@/redux/reducers/cart_slice";
import { useRouter } from "next/navigation";
import React from "react";

interface CartCardProps {
  cart: Cart | null;
}

export default function CartCard({ cart }: CartCardProps) {
  const router = useRouter();
  const Skeleton = () => {
    return (
      <div className="h-[50px] flex gap-2 justify-center items-center px-2">
        <div className="bg-gray-400 h-[30px] w-full"></div>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div
        className="h-[50px] flex gap-2 justify-center items-center px-2"
        onClick={() => router.push(`/carts/${cart?.id}`)}
      >
        <h1>{cart?.name}</h1>
      </div>
    );
  };

  return (
    <div className="w-full border hover:border-black p-2 cursor-pointer">
      {cart ? <ShowData /> : <Skeleton />}
    </div>
  );
}
