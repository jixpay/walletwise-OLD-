"use client";
import { error, success } from "@/redux/reducers/notification_slice";
import {
  Store,
  update_store,
  upload_store_image,
} from "@/redux/reducers/store_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UpdateStoreModalProps {
  store: Store | null;
  setStore: React.Dispatch<React.SetStateAction<Store | null>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateStoreModal({
  store,
  setStore,
  setShowUpdateModal,
}: UpdateStoreModalProps) {
  const [name, setName] = useState(store?.name);
  const [image, setImage] = useState(store?.image);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [description, setDescription] = useState(store?.description);
  const { loading_update } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch<AppDispatch>();

  const Loader = () => {
    return (
      <div className="bg-black opacity-75 w-full h-full absolute inset-0 flex flex-col text-white justify-center items-center">
        <Image src={"/icons/loading.svg"} alt="" width={70} height={70} />
        <h1>Please wait</h1>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-80 flex justify-center items-center z-20 p-[1rem]">
      <div className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/4 p-2 space-y-2 relative">
        {loading_update && <Loader />}
        <div className="bg-gray-400 h-[75px] text-white flex justify-center items-center text-2xl"></div>
        <div className="border-b border-black">
          <input
            type="text"
            placeholder="store name"
            className="focus:outline-none p-2"
            defaultValue={store?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="border-b border-black">
          <textarea
            placeholder="store description"
            className="focus:outline-none p-2 w-full"
            rows={4}
            defaultValue={store?.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="overflow-hidden">
          {uploadingFile ? (
            <div className="flex justify-center items-center h-[75px]">
              <h1 className="w-full h-full">Please wait</h1>
            </div>
          ) : (
            <>
              {image ? (
                <>
                  <div className="relative w-full h-[75px]">
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                  <button className="underline" onClick={() => setImage("")}>
                    remove
                  </button>
                </>
              ) : (
                <input
                  type="file"
                  className="focus:outline-none"
                  onChange={(e: any) => {
                    setUploadingFile(true);
                    dispatch(upload_store_image(e.target.files[0])).then(
                      (res: any) => {
                        if (res.error) {
                          dispatch(error(res.error.message));
                        } else {
                          setImage(res.payload);
                          dispatch(success("Image is Ready"));
                        }
                        setUploadingFile(false);
                      }
                    );
                  }}
                />
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-black text-white py-2 w-full"
            onClick={() =>
              dispatch(
                update_store({ id: store?.id, name, description, image })
              ).then((res: any) => {
                if (res.error) {
                  dispatch(error(res.error.message));
                } else {
                  setStore(res.payload);
                  setShowUpdateModal(false);
                }
              })
            }
          >
            UPDATE
          </button>
          <button
            className="bg-black text-white py-2 w-full"
            onClick={() => setShowUpdateModal(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
