"use client";
import { set_category } from "@/redux/reducers/products_slice";
import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryBar() {
  const { category } = useSelector((state: RootState) => state.product);
  const classCatBtn =
    "bg-black text-white px-[2rem] py-2 truncate min-w-[200px] hover:bg-opacity-100 flex flex-col justify-center items-center uppercase cursor-pointer";
  const dispatch = useDispatch<AppDispatch>();
  const categories = [
    "mens products",
    "womens products",
    "jewelry",
    "electronics",
    "kitchen utensils",
    "books",
  ];

  return (
    <ul className="flex gap-[1rem] overflow-auto">
      <li
        className={`${classCatBtn} ${category && "bg-opacity-50"}`}
        onClick={() => dispatch(set_category(""))}
      >
        ALL
      </li>
      {categories.map((val) => {
        return (
          <li
            key={val}
            className={`${classCatBtn} ${
              category === ""
                ? "bg-opacity-100"
                : category === val
                ? "bg-opacity-100"
                : "bg-opacity-50"
            }`}
            onClick={() => dispatch(set_category(val))}
          >
            {val}
          </li>
        );
      })}
    </ul>
  );
}
