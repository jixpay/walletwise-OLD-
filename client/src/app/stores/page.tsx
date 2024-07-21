"use client";
import StoreCard from "@/components/cards/StoreCard";
import { fetch_stores } from "@/redux/reducers/store_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Stores() {
  const { stores, loading_stores } = useSelector(
    (state: RootState) => state.store
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetch_stores());
    };
    fetchData();
  }, []);

  const Loading = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
          <li>
            <StoreCard store={null} />
          </li>
        </ul>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          {stores.map((store) => {
            return (
              <li key={String(store.id)}>
                <StoreCard store={store} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {loading_stores ? <Loading /> : <ShowData />}
    </div>
  );
}
