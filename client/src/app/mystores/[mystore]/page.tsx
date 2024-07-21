"use client";
import MyProductCard from "@/components/cards/MyProductCard";
import StoreOrderCard from "@/components/cards/StoreOrderCard";
import CreateNewProductModal from "@/components/modals/CreateNewProductModal";
import UpdateStoreModal from "@/components/modals/UpdateStoreModal";
import { error } from "@/redux/reducers/notification_slice";
import {
  fetch_storeorders,
  OrderProduct,
} from "@/redux/reducers/orderproduct_slice";
import { fetch_myproducts, Product } from "@/redux/reducers/products_slice";
import { fetch_store, Store } from "@/redux/reducers/store_slice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ViewSingleMyStore() {
  const pathname = usePathname();
  const store_id = parseInt(pathname.split("/")[2]);
  const dispatch = useDispatch<AppDispatch>();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[] | []>([]);
  const isLoading = !store || !products;
  const router = useRouter();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [orders, setOrders] = useState<OrderProduct[] | []>([]);

  useEffect(() => {
    const fetchDatas = () => {
      dispatch(fetch_store(store_id)).then((res: any) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          setStore(res.payload);
          dispatch(fetch_myproducts(store_id)).then((res: any) => {
            if (res.error) {
              dispatch(error(res.error.message));
            } else {
              setProducts(res.payload);
            }
          });
          dispatch(fetch_storeorders(store_id)).then((res: any) => {
            if (res.error) {
              dispatch(error(res.error.message));
            } else {
              setOrders(res.payload);
            }
          });
        }
      });
    };
    fetchDatas();
  }, []);

  const Skeleton = () => {
    return (
      <div className="min-h-screen">
        <div className="h-[300px] md:h-[200px] flex flex-col md:flex-row gap-[1rem]">
          <div className="bg-gray-400 h-full w-full md:w-[200px]"></div>
          <div className="space-y-2">
            <div className="bg-gray-400 h-[30px] w-[200px]"></div>
            <div className="bg-gray-400 h-[20px] w-[250px]"></div>
            <div className="bg-gray-400 h-[20px] w-[250px]"></div>
            <div className="bg-gray-400 h-[20px] w-[150px]"></div>
          </div>
        </div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div>
          <h1 className="uppercase text-xl pb-2">PRODUCTS</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <li>
              <MyProductCard product={null} />
            </li>
            <li>
              <MyProductCard product={null} />
            </li>
            <li>
              <MyProductCard product={null} />
            </li>
            <li>
              <MyProductCard product={null} />
            </li>
            <li>
              <MyProductCard product={null} />
            </li>
            <li>
              <MyProductCard product={null} />
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div className="">
        <div className="flex flex-col md:flex-row gap-[1rem]">
          <div className="h-[300px] w-full md:w-1/2 relative">
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
          <div className="space-y-2 w-full md:w-1/2">
            <h1 className="underline uppercase font-bold text-2xl">
              {store?.name}
            </h1>
            <p>{store?.description}</p>
          </div>
        </div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div className="min-h-[200px]">
          <h1 className="uppercase text-xl py-2">PRODUCTS</h1>
          <div className="py-[1rem]">
            <button
              className="underline"
              onClick={() => setShowCreateModal(true)}
            >
              NEW PRODUCT
            </button>
          </div>
          {products.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
              {products.map((product) => {
                return (
                  <li key={String(product.id)}>
                    <MyProductCard product={product} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-[200px] bg-black bg-opacity-25">
              <h1>EMPTY</h1>
            </div>
          )}
        </div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div className="min-h-[200px]">
          <h1 className="uppercase text-xl py-2">ORDERS</h1>
          {orders.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
              {orders.map((order) => {
                return (
                  <li key={String(order.id)}>
                    <StoreOrderCard orderProduct={order} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-[200px] bg-black bg-opacity-25">
              <h1>EMPTY</h1>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-[1rem] relative">
      {showUpdateModal && (
        <UpdateStoreModal
          store={store}
          setStore={setStore}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {showCreateModal && (
        <CreateNewProductModal
          store_id={store_id}
          setShowCreateModal={setShowCreateModal}
          products={products}
          setProducts={setProducts}
        />
      )}
      <div className="pt-[1rem]">
        <button className="underline" onClick={() => router.back()}>
          RETURN
        </button>
      </div>
      <div className="pb-[1rem]">
        <button className="underline" onClick={() => setShowUpdateModal(true)}>
          UPDATE
        </button>
      </div>
      {isLoading ? <Skeleton /> : <ShowData />}
    </div>
  );
}
