"use client";
import { Store } from "@/redux/reducers/store_slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface MyStoreCardProps {
  store: Store | null;
}

export default function MyStoreCard({ store }: MyStoreCardProps) {
  const router = useRouter();
  const Skeleton = () => {
    return (
      <div className="h-[150px] flex gap-2">
        <div className="bg-gray-400 h-full w-[40%]"></div>
        <div className="h-full w-[60%] space-y-2">
          <div className="bg-gray-400 h-[30px]"></div>
          <div className="bg-gray-400 h-[20px]"></div>
          <div className="bg-gray-400 h-[20px]"></div>
          <div className="bg-gray-400 h-[30px] w-1/2"></div>
        </div>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div
        className="h-full md:h-[150px] flex flex-col md:flex-row gap-2"
        onClick={() => router.push(`/mystores/${store?.id}`)}
      >
        <div className="bg-gray-400 h-[200px] md:h-full w-full md:w-[40%] relative">
          {store && (
            <img
              src={store?.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
          )}
        </div>
        <div className="overflow-hidden w-full md:w-[70%] h-full">
          <div className="flex gap-2 border-b border-black">
            <h1 className="text-xl font-bold uppercase truncate">
              {store?.name}
            </h1>
          </div>
          <p>{store?.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full border hover:border-black p-2 cursor-pointer">
      {store ? <ShowData /> : <Skeleton />}
    </div>
  );
}
