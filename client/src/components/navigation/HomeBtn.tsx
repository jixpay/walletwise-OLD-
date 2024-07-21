"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function HomeBtn() {
  const router = useRouter();
  return (
    <div className="w-full md:w-[25%] flex justify-start items-center">
      <button onClick={() => router.push("/")}>
        <Image src={"/icons/home.svg"} alt="" width={30} height={30} />
      </button>
    </div>
  );
}
