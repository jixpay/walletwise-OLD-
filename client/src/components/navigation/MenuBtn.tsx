"use client";
import React from "react";

export default function MenuBtn() {


  return (
    <div className="flex md:hidden justify-start w-full">
      <div
        className="burger-menu cursor-pointer "
        onClick={() => {
          //@ts-ignore
          document.querySelector(".burger-menu").classList.toggle("active");
          //@ts-ignore
          document.querySelector(".menu").classList.toggle("active");
        }}
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </div>
  );
}
