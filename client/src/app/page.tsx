"use client";
import ProductCard from "@/components/cards/ProductCard";
import StoreCard from "@/components/cards/StoreCard";
import { fetch_products } from "@/redux/reducers/products_slice";
import { fetch_stores } from "@/redux/reducers/store_slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading_products } = useSelector(
    (state: RootState) => state.product
  );
  const { stores, loading_stores } = useSelector(
    (state: RootState) => state.store
  );

  useEffect(() => {
    const fetchDatas = () => {
      dispatch(fetch_products());
      dispatch(fetch_stores());
    };
    fetchDatas();
  }, []);

  const SampleProducts = () => {
    return (
      <>
        {loading_products ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <li>
              <ProductCard product={null} />
            </li>
            <li>
              <ProductCard product={null} />
            </li>
            <li>
              <ProductCard product={null} />
            </li>
            <li>
              <ProductCard product={null} />
            </li>
            <li>
              <ProductCard product={null} />
            </li>
            <li>
              <ProductCard product={null} />
            </li>
          </ul>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {products.slice(0, 6).map((product) => {
              return (
                <li key={String(product.id)}>
                  <ProductCard product={product} />
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  };

  const SampleStores = () => {
    return (
      <>
        {loading_stores ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <li>
              <StoreCard store={null} />
            </li>
          </ul>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {stores.slice(0, 6).map((store) => {
              return (
                <li key={String(store.id)}>
                  <StoreCard store={store} />
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  };

  return (
    <section className="w-full">
      <div className="w-full h-[250px] md:h-[500px]">
        <img
          src="/images/home.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt=""
        />
      </div>
      <hr className="my-4 w-full border border-black" />
      <div className="w-full py-[1rem]">
        <h1 className="uppercase font-bold text-2xl">Products</h1>
        <SampleProducts />
        <div className="w-full flex justify-center items-center py-[1rem]">
          <button
            className="underline"
            onClick={() => router.push("/products")}
          >
            browse all products
          </button>
        </div>
      </div>
      <div className="w-full py-[1rem]">
        <h1 className="uppercase font-bold text-2xl">Stores</h1>
        <SampleStores />
        <div className="w-full flex justify-center items-center py-[1rem]">
          <button className="underline" onClick={() => router.push("/stores")}>
            browse all stores
          </button>
        </div>
      </div>
    </section>
  );
}
