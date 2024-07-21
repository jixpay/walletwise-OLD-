"use client";
import StoreCard from "@/components/cards/StoreCard";
import UpdateProductModal from "@/components/modals/UpdateProductModal";
import { error, success } from "@/redux/reducers/notification_slice";
import {
  delete_product,
  fetch_product,
  Product,
} from "@/redux/reducers/products_slice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ViewSingleMyProduct() {
  const pathname = usePathname();
  const product_id = parseInt(pathname.split("/")[3]);
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const isLoading = !product;
  const router = useRouter();
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetch_product(product_id)).then((res: any) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          setProduct(res.payload);
        }
      });
    };
    fetchData();
  }, []);

  const Skeleton = () => {
    return (
      <div className="w-full h-screen flex flex-col md:flex-row gap-[1rem]">
        <div className="w-full md:w-[70%] h-full">
          <div className="bg-gray-400 w-full h-full"></div>
        </div>
        <div className="w-full md:w-[30%] h-full space-y-[1rem]">
          <div className="flex gap-2">
            <button className="bg-black text-white px-[1rem] py-2 w-full">
              UPDATE
            </button>
            <button className="bg-black text-white px-[1rem] py-2 w-full">
              REMOVE
            </button>
          </div>
          <div>
            <div className="bg-gray-400 w-full h-[40px]"></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-400 w-full h-[20px]"></div>
            <div className="bg-gray-400 w-full h-[20px]"></div>
            <div className="bg-gray-400 w-full h-[20px]"></div>
            <div className="bg-gray-400 w-full h-[20px]"></div>
            <div className="bg-gray-400 w-1/2 h-[20px]"></div>
          </div>
          <div>
            <div className="bg-gray-400 w-1/4 h-[40px]"></div>
          </div>
          <div>
            <div className="bg-gray-400 w-[30%] h-[40px]"></div>
          </div>
          <StoreCard store={null} />
        </div>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div className="w-full flex flex-col md:flex-row gap-[1rem] relative">
        <div className="w-full md:w-[70%] h-[400px] md:h-[600px]">
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
        <div className="w-full md:w-[30%] h-full space-y-[1rem]">
          <div className="flex gap-2">
            <button
              className="bg-black text-white px-[1rem] py-2 w-full"
              onClick={() => setShowUpdateModal(true)}
            >
              UPDATE
            </button>
            <button
              className="bg-black text-white px-[1rem] py-2 w-full"
              onClick={() =>
                dispatch(delete_product(product_id)).then((res: any) => {
                  if (res.error) {
                    dispatch(error(res.error.message));
                  } else {
                    router.back();
                    dispatch(success("Product has been removed"));
                  }
                })
              }
            >
              REMOVE
            </button>
          </div>
          <div className="w-full h-[40px]">
            <h1 className="text-2xl uppercase font-bold">{product?.name}</h1>
          </div>
          <h1>{product?.description}</h1>
          <div className="w-full h-[40px]">{`${product?.stocks} stock(s) left`}</div>
          <div className="w-full h-[40px]">{`$${product?.price}`}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative">
      <div className="py-[1rem]">
        <button className="underline" onClick={() => router.back()}>
          RETURN
        </button>
      </div>
      {showUpdateModal && (
        <UpdateProductModal
          product={product}
          setProduct={setProduct}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {isLoading ? <Skeleton /> : <ShowData />}
    </div>
  );
}
