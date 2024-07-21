"use client";
import { fetch_carts } from "@/redux/reducers/cart_slice";
import { create_cartproduct } from "@/redux/reducers/cartproduct_slice";
import { error, success } from "@/redux/reducers/notification_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddToCartModalProps {
  product_id: number;
  setShowAddToCartModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddToCartModal({
  product_id,
  setShowAddToCartModal,
}: AddToCartModalProps) {
  const { loading_create } = useSelector(
    (state: RootState) => state.cartproduct
  );
  const [selectedcart, setSelectedCart] = useState<number>();
  const { carts, loading_carts } = useSelector(
    (state: RootState) => state.cart
  );
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetch_carts());
    };
    fetchData();
  }, []);

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
        {(loading_create || loading_carts) && <Loader />}
        <div className="bg-gray-400 h-[75px] text-white flex justify-center items-center text-2xl"></div>
        <input
          type="number"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="quantity"
          onChange={(e: any) => {
            setQuantity(parseInt(e.target.value));
          }}
        />
        <ul className="space-y-1">
          {carts.map((cart) => {
            return (
              <li
                key={String(cart.id)}
                className={`${
                  selectedcart
                    ? cart.id === selectedcart
                      ? "bg-gray-300"
                      : ""
                    : ""
                }`}
              >
                <div
                  className="border p-2 hover:border-black hover:drop-shadow-lg transition-all ease-in-out duration-300 cursor-pointer"
                  onClick={() => setSelectedCart(cart.id)}
                >
                  {cart.name}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2">
          <button
            className="bg-black text-white py-2 w-full"
            onClick={() =>
              dispatch(
                create_cartproduct({
                  quantity,
                  cart_id: selectedcart,
                  product_id,
                })
              ).then((res: any) => {
                if (res.error) {
                  dispatch(error(res.error.message));
                } else {
                  setShowAddToCartModal(false);
                  dispatch(success("Product Added to the Cart"));
                }
              })
            }
          >
            ADD TO CART
          </button>
          <button
            className="bg-black text-white py-2 w-full"
            onClick={() => setShowAddToCartModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
