"use client";
import OrderCard from "@/components/cards/OrderCard";
import CreateNewCartModal from "@/components/modals/CreateNewCartModal";
import { fetch_carts } from "@/redux/reducers/cart_slice";
import { fetch_orders } from "@/redux/reducers/order_slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading_orders } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetch_orders());
    };
    fetchData();
  }, []);

  const Loading = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
          <li>
            <OrderCard order={null} />
          </li>
        </ul>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          {orders.map((order) => {
            return (
              <li key={String(order.id)}>
                <OrderCard order={order} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {loading_orders ? <Loading /> : <ShowData />}
    </div>
  );
}
