"use client";
import CartCard from "@/components/cards/CartCard";
import CreateNewCartModal from "@/components/modals/CreateNewCartModal";
import { fetch_carts } from "@/redux/reducers/cart_slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Carts() {
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { carts, loading_carts } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    const fetchCarts = () => {
      dispatch(fetch_carts());
    };
    fetchCarts();
  }, []);

  const Loading = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
          <li>
            <CartCard cart={null} />
          </li>
        </ul>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          {carts.map((cart) => {
            return (
              <li key={String(cart.id)}>
                <CartCard cart={cart} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const EmptyData = () => {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>Empty</h1>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      <div className="py-[1rem]">
        <button
          className="underline uppercase"
          onClick={() => setShowCreateModal(true)}
        >
          New Cart
        </button>
      </div>
      {loading_carts ? <Loading /> : <ShowData />}
      {showCreateModal && (
        <CreateNewCartModal setShowCreateModal={setShowCreateModal} />
      )}
    </div>
  );
}
