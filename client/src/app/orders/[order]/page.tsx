"use client";
import OrderProductCard from "@/components/cards/OrderProductCard";
import { error } from "@/redux/reducers/notification_slice";
import { fetch_order, Order } from "@/redux/reducers/order_slice";
import {
  fetch_orderproducts,
  OrderProduct,
} from "@/redux/reducers/orderproduct_slice";
import { AppDispatch, RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ViewSingleOrder() {
  const pathname = usePathname();
  const order_id = parseInt(pathname.split("/")[2]);
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<OrderProduct[] | []>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      dispatch(fetch_order(order_id)).then((res: any) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          setOrder(res.payload);

          dispatch(fetch_orderproducts(order_id)).then((res: any) => {
            if (res.error) {
              dispatch(error(res.error.message));
            } else {
              setProducts(res.payload);
            }
          });

          setIsLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  const Skeleton = () => {
    return (
      <div className="min-h-screen">
        <div className="bg-gray-400 h-[30px] w-full md:w-[200px]"></div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div>
          <h1 className="uppercase text-xl pb-2">PRODUCTS</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <li>
              <OrderProductCard orderProduct={null} />
            </li>
            <li>
              <OrderProductCard orderProduct={null} />
            </li>
            <li>
              <OrderProductCard orderProduct={null} />
            </li>
            <li>
              <OrderProductCard orderProduct={null} />
            </li>
            <li>
              <OrderProductCard orderProduct={null} />
            </li>
            <li>
              <OrderProductCard orderProduct={null} />
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div className="min-h-screen">
        <div className="w-full">{`ORDER ID : ${order?.id}`}</div>
        <div className="w-full">{`MOP : ${order?.mode_of_payment}`}</div>
        <div className="w-full">{`DESTINATION : ${order?.destination}`}</div>
        <div className="w-full">{`MESSAGE : ${order?.message || ""}`}</div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div>
          <h1 className="uppercase text-xl pb-2">PRODUCTS</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {products.map((product) => {
              return (
                <li key={String(product.id)}>
                  <OrderProductCard orderProduct={product} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen space-y-[1rem] relative">
      <div className="pt-[1rem]">
        <button className="underline" onClick={() => router.back()}>
          RETURN
        </button>
      </div>
      {isLoading ? <Skeleton /> : <ShowData />}
      <div className="w-full md:w-1/2 lg:w-1/4 space-y-2 sticky bottom-[1rem] md:bottom-[2rem]">
        <h1 className="text-white bg-gray-600 p-[2rem]">{`TOTAL PRICE: $${order?.total}`}</h1>
      </div>
    </div>
  );
}
