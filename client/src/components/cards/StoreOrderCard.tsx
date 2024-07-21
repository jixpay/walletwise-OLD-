"use client";
import { error, success } from "@/redux/reducers/notification_slice";

import {
  cancel_orderproduct,
  OrderProduct,
  ship_orderproduct,
} from "@/redux/reducers/orderproduct_slice";
import { fetch_product, Product } from "@/redux/reducers/products_slice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface OrderProductCardProps {
  orderProduct: OrderProduct | null;
}

export default function StoreOrderCard({
  orderProduct,
}: OrderProductCardProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [cancelling, setCancelling] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderProduct | null>(orderProduct);
  const dispatch = useDispatch<AppDispatch>();

  const disableButton = [
    "RECEIVED",
    "SHIPPED",
    "CANCELLED",
    undefined,
  ].includes(order?.status);

  useEffect(() => {
    const fetchDatas = () => {
      if (order) {
        dispatch(fetch_product(order?.product_id)).then((res: any) => {
          if (res.error) {
            dispatch(error(res.error.message));
          } else {
            setProduct(res.payload);
          }
        });
      }
    };
    fetchDatas();
  }, [order]);

  const Skeleton = () => {
    return (
      <div className="w-full h-[150px] flex gap-2">
        <div className="relative w-[30%] h-full bg-gray-400"></div>
        <div className="overflow-hidden w-[70%] h-full space-y-2">
          <div className="flex gap-2">
            <div className="bg-gray-400 h-[40px] w-3/4"></div>
            <div className="bg-gray-400 h-[40px] w-1/4"></div>
          </div>
          <div className="bg-gray-400 h-[20px] w-full"></div>
          <div className="bg-gray-400 h-[20px] w-full"></div>
          <div className="bg-gray-400 h-[20px] w-full"></div>
          <div className="bg-gray-400 h-[20px] w-1/2"></div>
        </div>
      </div>
    );
  };

  const Loading = () => {
    return (
      <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
        <Image src={"/icons/loading.svg"} alt="" width={100} height={100} />
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div className={`w-full h-[150px] flex gap-2 relative`}>
        {cancelling && <Loading />}
        <div className="relative w-[30%] h-full">
          {product && (
            <img
              src={product?.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
          )}
        </div>
        <div className="overflow-hidden w-[70%] h-full relative">
          <div className="flex gap-2 border-b border-black justify-between">
            <h1 className="text-xl font-bold uppercase truncate">
              {product?.name}
            </h1>
            <h1 className="text-xl font-bold uppercase">{`$${product?.price}`}</h1>
          </div>
          <div className="flex flex-col justify-center py-6">
            <div className="flex gap-2">
              <h1>STATUS:</h1>
              <h1
                className={`font-bold ${
                  order?.status === "CANCELLED"
                    ? "text-red-500"
                    : order?.status === "SHIPPED"
                    ? "text-orange-500"
                    : order?.status === "RECEIVED"
                    ? "text-green-500"
                    : order?.status === "PREPARING"
                    ? "text-blue-500"
                    : ""
                }`}
              >
                {order?.status}
              </h1>
            </div>
            <h1>{`QTY: ${order?.quantity}x`}</h1>
          </div>
          <button
            disabled={disableButton}
            className={`absolute bottom-0 bg-black text-white p-1 w-full ${
              disableButton ? "hover:cursor-not-allowed bg-opacity-50" : ""
            }`}
            onClick={() => {
              if (order) {
                setCancelling(true);
                dispatch(ship_orderproduct(order?.id)).then((res: any) => {
                  if (res.error) {
                    dispatch(error(res.error.message));
                  } else {
                    dispatch(success("SHIPPED!"));
                    setOrder(res.payload);
                  }
                  setCancelling(false);
                });
              }
            }}
          >
            {disableButton ? "..." : "SHIP ORDER"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full border p-2`}>
      {product ? <ShowData /> : <Skeleton />}
    </div>
  );
}
