"use client";
import { signout } from "@/redux/reducers/auth_slice";
import { error, success } from "@/redux/reducers/notification_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UserModalProps {
  setShowUSerModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserModal({ setShowUSerModal }: UserModalProps) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const Loader = () => {
    return (
      <div className="bg-black opacity-75 w-full h-full absolute inset-0 flex flex-col text-white justify-center items-center">
        <Image src={"/icons/loading.svg"} alt="" width={70} height={70} />
        <h1>Please wait</h1>
      </div>
    );
  };

  const Unauthenticated = () => {
    return (
      <div className="space-y-2 w-full">
        <button
          className="bg-gray-500 text-white w-full p-2"
          onClick={() => {
            router.push("/authentication/signin");
            setShowUSerModal(false);
          }}
        >
          LOGIN AN ACCOUNT
        </button>
        <button
          className="bg-gray-500 text-white w-full p-2"
          onClick={() => {
            router.push("/authentication/signup");
            setShowUSerModal(false);
          }}
        >
          CREATE AN ACCOUNT
        </button>
      </div>
    );
  };

  const Authenticated = () => {
    return (
      <div className="space-y-2 w-full flex flex-col justify-center items-center">
        <div className="w-[150px] h-[150px] relative flex justify-center items-center">
          {user?.image && (
            <img
              className="rounded-full"
              src={user?.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
          )}
        </div>
        <h1 className="w-full">{`${user?.fname} ${user?.lname}`}</h1>
        <h1 className="w-full">{`@${user?.username}`}</h1>
        <button
          className="bg-gray-500 text-white w-full p-2"
          onClick={() =>
            dispatch(signout()).then((res: any) => {
              if (res.error) {
                dispatch(error(res.error.message));
              } else {
                dispatch(success("Bye bye"));
              }
            })
          }
        >
          SIGNOUT ACCOUNT
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="h-screen w-full flex justify-center items-center">
        <div className="border p-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/4 bg-white drop-shadow-lg space-y-2 relative overflow-hidden">
          <div className="bg-gray-400 h-[75px] text-white flex justify-center items-center text-2xl"></div>
          {user ? <Authenticated /> : <Unauthenticated />}
          {isLoading && <Loader />}
          <div className="w-full flex justify-center items-center">
            <button
              className="underline"
              onClick={() => setShowUSerModal(false)}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
