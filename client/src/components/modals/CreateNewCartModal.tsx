"use client";
import { create_cart } from "@/redux/reducers/cart_slice";
import { error } from "@/redux/reducers/notification_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CreateNewCartModalProps {
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNewCartModal({
  setShowCreateModal,
}: CreateNewCartModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const { carts, loading_create } = useSelector(
    (state: RootState) => state.cart
  );

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
        {loading_create && <Loader />}
        <div className="bg-gray-400 h-[75px] text-white flex justify-center items-center text-2xl"></div>
        <input
          type="text"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="cart name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <div className="flex gap-2">
          <button
            className="bg-black text-white py-2 w-full"
            onClick={() =>
              dispatch(create_cart({ name })).then((res: any) => {
                if (res.error) {
                  dispatch(error(res.error.message));
                } else {
                  setShowCreateModal(false);
                }
              })
            }
          >
            CREATE
          </button>
          <button
            className="bg-black text-white py-2 w-full"
            onClick={() => setShowCreateModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
