"use client";
import CartProductCard from "@/components/cards/CartProductCard";
import CheckOutCartModal from "@/components/modals/CheckOutCartModal";
import { calculate_total, Cart, fetch_cart } from "@/redux/reducers/cart_slice";
import {
  CartProduct,
  fetch_cartproducts,
} from "@/redux/reducers/cartproduct_slice";
import { error } from "@/redux/reducers/notification_slice";
import { AppDispatch } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ViewSingleCart() {
  const pathname = usePathname();
  const cart_id = parseInt(pathname.split("/")[2]);
  const dispatch = useDispatch<AppDispatch>();
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<CartProduct[] | []>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  useEffect(() => {
    const fetchDatas = () => {
      setIsLoading(true);
      dispatch(fetch_cart(cart_id)).then((res: any) => {
        if (res.error) {
          dispatch(error(res.error.message));
        } else {
          setCart(res.payload);
          dispatch(fetch_cartproducts(cart_id)).then((res: any) => {
            if (res.error) {
              dispatch(error(res.error.message));
            } else {
              setProducts(res.payload);
            }
          });
          dispatch(calculate_total(cart_id)).then((res: any) => {
            if (res.error) {
              dispatch(error(res.error.message));
            } else {
              setTotal(res.payload);
            }
          });
          setIsLoading(false);
        }
      });
    };
    fetchDatas();
  }, [refresh]);

  const Skeleton = () => {
    return (
      <div className="min-h-screen">
        <div className="bg-gray-400 h-[30px] w-full md:w-[200px]"></div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div>
          <h1 className="uppercase text-xl pb-2">PRODUCTS</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <li>
              <CartProductCard
                cartProduct={null}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
            <li>
              <CartProductCard
                cartProduct={null}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
            <li>
              <CartProductCard
                cartProduct={null}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
            <li>
              <CartProductCard
                cartProduct={null}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
            <li>
              <CartProductCard
                cartProduct={null}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
            <li>
              <CartProductCard
                cartProduct={null}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div className="min-h-screen">
        <div className="h-[30px] w-full md:w-[200px]">{cart?.name}</div>
        <hr className="my-[2rem] bg-black h-[4px]" />
        <div>
          <h1 className="uppercase text-xl pb-2">PRODUCTS</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {products.map((product) => {
              return (
                <li key={String(product.id)}>
                  <CartProductCard
                    cartProduct={product}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen space-y-[1rem] relative">
      {showCheckOut && (
        <CheckOutCartModal
          setCheckOut={setShowCheckOut}
          cart_id={cart_id}
          total={total}
        />
      )}
      <div className="pt-[1rem]">
        <button className="underline" onClick={() => router.back()}>
          RETURN
        </button>
      </div>
      {isLoading ? <Skeleton /> : <ShowData />}
      <div className="w-full md:w-1/2 lg:w-1/4 space-y-2 sticky bottom-[1rem] md:bottom-[2rem]">
        <h1 className="text-white bg-gray-600 p-[2rem]">{`$${total}`}</h1>
        <button
          className="text-xl px-2 py-1 bg-black text-white"
          onClick={() => setShowCheckOut(true)}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
