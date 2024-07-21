"use client";
import StoreCard from "@/components/cards/StoreCard";
import AddToCartModal from "@/components/modals/AddToCartModal";
import { error } from "@/redux/reducers/notification_slice";
import { fetch_product, Product } from "@/redux/reducers/products_slice";
import { fetch_store, Store } from "@/redux/reducers/store_slice";
import { AppDispatch } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ViewSingleProduct() {
  const pathname = usePathname();
  const product_id = parseInt(pathname.split("/")[2]);
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const isLoading = !product || !store;
  const router = useRouter();

  useEffect(() => {
    const fetchDatas = () => {
      dispatch(fetch_product(product_id)).then((res: any) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          setProduct(res.payload);
          dispatch(fetch_store(res.payload.store_id)).then((res: any) => {
            if (res.error) {
              dispatch(error(res.error.message));
            } else {
              setStore(res.payload);
            }
          });
        }
      });
    };
    fetchDatas();
  }, []);

  const Skeleton = () => {
    return (
      <div className="w-full h-screen flex flex-col md:flex-row gap-[1rem]">
        <div className="w-full md:w-[70%] h-full">
          <div className="bg-gray-400 w-full h-full"></div>
        </div>
        <div className="w-full md:w-[30%] h-full space-y-[1rem]">
          <div className="">
            <button className="bg-black text-white px-[1rem] py-2">
              ADD TO CART
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
        {product && (
          <>
            {showAddToCartModal && (
              <AddToCartModal
                product_id={product.id}
                setShowAddToCartModal={setShowAddToCartModal}
              />
            )}
          </>
        )}
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
          <div className="">
            <button
              className="bg-black text-white px-[1rem] py-2"
              onClick={() => setShowAddToCartModal(true)}
            >
              ADD TO CART
            </button>
          </div>
          <div className="w-full">
            <h1 className="text-2xl uppercase font-bold">{product?.name}</h1>
          </div>
          <h1 className="border-b border-black">{product?.description}</h1>
          <div className="w-full">{`${product?.category}`}</div>
          <div className="w-full">{`${product?.stocks} stock(s) left`}</div>
          <div className="w-full">{`$${product?.price}`}</div>

          <StoreCard store={store} />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="py-[1rem]">
        <button className="underline" onClick={() => router.back()}>
          RETURN
        </button>
      </div>
      {isLoading ? <Skeleton /> : <ShowData />}
    </div>
  );
}
