"use client";
import { Product } from "@/redux/reducers/products_slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCardProps {
  product: Product | null;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
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

  const ShowData = () => {
    return (
      <div
        className="w-full md:h-[150px] flex flex-col md:flex-row gap-2"
        onClick={() => router.push(`/products/${product?.id}`)}
      >
        <div className="relative w-full md:w-[40%] h-[250px] md:h-full">
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
        <div className="overflow-hidden w-full md:w-[60%] h-full">
          <div className="flex gap-2 border-b border-black justify-between w-full">
            <h1 className="text-xl font-bold uppercase truncate">
              {product?.name}
            </h1>
            <h1 className="text-xl font-bold uppercase">{`$${product?.price}`}</h1>
          </div>
          <p>{product?.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full border hover:border-black p-2 cursor-pointer">
      {product ? <ShowData /> : <Skeleton />}
    </div>
  );
}
