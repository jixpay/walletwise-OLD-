"use client";
import React, { useEffect, useState } from "react";
import HomeBtn from "./HomeBtn";
import SearchBar from "./SearchBar";
import Image from "next/image";
import MenuBtn from "./MenuBtn";
import { usePathname, useRouter } from "next/navigation";
import UserModal from "../modals/UserModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetch_user } from "@/redux/reducers/auth_slice";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [showUserModal, setShowUserModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetch_user());
    };
    fetchData();
  }, [pathname]);

  const PublicNavs = () => {
    return (
      <ul className="flex flex-col md:flex-row w-full md:w-[50%] justify-start md:justify-center md:items-center gap-[1rem]">
        <li>
          <button onClick={() => router.push("/stores")}>STORES</button>
        </li>
        <li>
          <button onClick={() => router.push("/products")}>PRODUCTS</button>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
    );
  };

  const PrivateNavs = () => {
    return (
      <ul className="w-full md:w-[25%] flex justify-start md:justify-end items-center gap-[1rem]">
        <li>
          <button onClick={() => router.push("/carts")}>
            <Image src={"/icons/carts.svg"} alt="" width={30} height={30} />
          </button>
        </li>
        <li>
          <button onClick={() => router.push("/orders")}>
            <Image src={"/icons/orders.svg"} alt="" width={30} height={30} />
          </button>
        </li>
        <li>
          <button onClick={() => router.push("/mystores")}>
            <Image src={"/icons/stores.svg"} alt="" width={30} height={30} />
          </button>
        </li>
        <li>
          <button onClick={() => setShowUserModal(true)}>
            <Image src={"/icons/account.svg"} alt="" width={30} height={30} />
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div
      className={`bg-white sticky top-0 px-[1rem] pt-[1rem] md:pt-[2rem] md:px-[4rem] z-20 ${
        pathname === "/authentication/signin"
          ? "hidden"
          : pathname === "/authentication/signup"
          ? "hidden"
          : ""
      }`}
    >
      <div className="menu w-full overflow-hidden border-b border-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 relative">
        <MenuBtn />
        {showUserModal && <UserModal setShowUSerModal={setShowUserModal} />}
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0 py-[1rem] md:py-0">
          <HomeBtn />
          <PublicNavs />
          <PrivateNavs />
        </div>
      </div>
    </div>
  );
}
