"use client";
import { calculate_total } from "@/redux/reducers/cart_slice";
import {
  CartProduct,
  delete_cartproduct,
  update_cartproduct,
} from "@/redux/reducers/cartproduct_slice";
import { error } from "@/redux/reducers/notification_slice";
import { fetch_product, Product } from "@/redux/reducers/products_slice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface CartProductCardProps {
  cartProduct: CartProduct | null;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartProductCard({
  cartProduct,
  refresh,
  setRefresh,
}: CartProductCardProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchDatas = () => {
      if (cartProduct) {
        dispatch(fetch_product(cartProduct.product_id)).then((res: any) => {
          if (res.error) {
            dispatch(error(res.error.message));
          } else {
            setProduct(res.payload);
          }
        });
      }
    };
    fetchDatas();
  }, [cartProduct]);

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
      <div className="w-full h-[150px] flex gap-2">
        <div className="relative w-[30%] h-full">
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
        <div className="overflow-hidden w-[70%] h-full relative">
          <div className="flex gap-2 border-b border-black justify-between">
            <h1 className="text-xl font-bold uppercase truncate">
              {product?.name}
            </h1>
            <h1 className="text-xl font-bold uppercase">{`$${product?.price}`}</h1>
          </div>
          <div className="py-[2rem]">
            <h1>{`Qty: ${cartProduct?.quantity}x`}</h1>
          </div>
          <div className="absolute bottom-0 w-full flex gap-2">
            <button
              className="bg-black text-white p-2 w-full"
              onClick={() => {
                if (cartProduct) {
                  dispatch(delete_cartproduct(cartProduct?.id)).then(
                    (res: any) => {
                      if (res.error) {
                        dispatch(error(res.error.message));
                      } else {
                        setRefresh(!refresh);
                      }
                    }
                  );
                }
              }}
            >
              remove
            </button>
            <button
              className="bg-black text-white p-2 w-full"
              onClick={() => {
                if (cartProduct) {
                  dispatch(
                    update_cartproduct({
                      id: cartProduct.id,
                      quantity: cartProduct.quantity + 1,
                    })
                  ).then((res: any) => {
                    if (res.error) {
                      dispatch(error(res.error.message));
                    } else {
                      setRefresh(!refresh);
                    }
                  });
                }
              }}
            >
              +
            </button>
            <button
              className="bg-black text-white p-2 w-full"
              onClick={() => {
                if (cartProduct) {
                  dispatch(
                    update_cartproduct({
                      id: cartProduct.id,
                      quantity: cartProduct.quantity - 1,
                    })
                  ).then((res: any) => {
                    if (res.error) {
                      dispatch(error(res.error.message));
                    } else {
                      setRefresh(!refresh);
                    }
                  });
                }
              }}
            >
              -
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full border p-2">
      {product ? <ShowData /> : <Skeleton />}
    </div>
  );
}
