"use client";
import MyStoreCard from "@/components/cards/MyStoreCard";
import CreateStoreModal from "@/components/modals/CreateStoreModal";
import { error } from "@/redux/reducers/notification_slice";
import { fetch_mystores, Store } from "@/redux/reducers/store_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyStores() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { mystores, loading_mystores } = useSelector(
    (state: RootState) => state.store
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetch_mystores());
  }, []);

  const Loading = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
          <li>
            <MyStoreCard store={null} />
          </li>
        </ul>
      </div>
    );
  };

  const ShowData = () => {
    return (
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
          {mystores.map((store) => {
            return (
              <li key={String(store.id)}>
                <MyStoreCard store={store} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const EmptyData = () => {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>Empty</h1>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      <div className="py-[1rem]">
        <button
          className="underline uppercase"
          onClick={() => setShowCreateModal(true)}
        >
          New Store
        </button>
      </div>
      {loading_mystores ? (
        <Loading />
      ) : (
        <>{mystores.length == 0 ? <ShowData /> : <ShowData />}</>
      )}

      {showCreateModal && (
        <CreateStoreModal setShowCreateModal={setShowCreateModal} />
      )}
    </div>
  );
}
