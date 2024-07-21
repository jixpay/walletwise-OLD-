"use client";
import { set_search } from "@/redux/reducers/products_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { search_query } = useSelector((state: RootState) => state.product);
  return (
    <div className="flex">
      <input
        type="search"
        placeholder="Search product"
        defaultValue={search_query}
        className={`focus:outline-none px-2 border-b border-black w-full md:w-3/4 lg:w-full placeholder:text-center`}
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value === "") {
            dispatch(set_search(""));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(set_search(name));
            router.push("/products");
          }
        }}
      />
      <Image src={"/icons/search.svg"} alt="" width={30} height={30} />
    </div>
  );
}
