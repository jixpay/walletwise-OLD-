"use client";
import ProductCard from "@/components/cards/ProductCard";
import CategoryBar from "@/components/CategoryBar";
import {
  fetch_products,
  search_product,
} from "@/redux/reducers/products_slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading_products, search_query, category } = useSelector(
    (state: RootState) => state.product
  );

  const filtered =
    category === ""
      ? products
      : products.filter((product) => product.category === category);

  useEffect(() => {
    const fetchData = () => {
      if (search_query === "") {
        dispatch(fetch_products());
      } else {
        dispatch(search_product(search_query));
      }
    };
    fetchData();
  }, [search_query]);

  const Loading = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
          <li>
            <ProductCard product={null} />
          </li>
        </ul>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          {filtered.map((product) => {
            return (
              <li key={String(product.id)}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <section className="min-h-screen w-full relative">
      <div className="py-[2rem]">
        <CategoryBar />
      </div>
      {loading_products ? <Loading /> : <ShowData />}
    </section>
  );
}
