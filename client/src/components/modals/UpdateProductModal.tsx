import { error, success } from "@/redux/reducers/notification_slice";
import {
  create_product,
  Product,
  update_product,
  upload_product_image,
} from "@/redux/reducers/products_slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CreateNewProductModalProps {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateProductModal({
  product,
  setProduct,
  setShowUpdateModal,
}: CreateNewProductModalProps) {
  const [uploadingFile, setUploadingFile] = useState(false);
  const { loading_create } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [stocks, setStocks] = useState(product?.stocks || 0);
  const [image, setImage] = useState(product?.image);
  const [category, setCategory] = useState(product?.category);

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
        {loading_create && <Loader />}
        <div className="bg-gray-400 h-[75px] text-white flex justify-center items-center text-2xl"></div>
        <input
          type="text"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="product name"
          defaultValue={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="product description"
          defaultValue={description}
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="number"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="price"
          defaultValue={price}
          onChange={(e: any) => {
            setPrice(parseFloat(e.target.value));
          }}
        />
        <input
          type="number"
          className="border-b border-black w-full p-1 focus:outline-none"
          placeholder="stock"
          defaultValue={stocks}
          onChange={(e: any) => {
            setStocks(parseInt(e.target.value));
          }}
        />
        <select
          name="category"
          className="border-b border-black w-full p-1 focus:outline-none"
          id=""
          value={category}
          onChange={(e: any) => {
            setCategory(e.target.value);
          }}
        >
          <option value="mens products">MENS PRODUCTS</option>
          <option value="womens products">WOMENS PRODUCTS</option>
          <option value="jewelry">JEWELRY</option>
          <option value="electronics">ELECTRONICS</option>
          <option value="kitchen utensils">KITCHEN UTENSILS</option>
          <option value="books">BOOKS</option>
        </select>
        <div className="overflow-hidden">
          {uploadingFile ? (
            <div className="flex justify-center items-center h-[75px]">
              <h1 className="w-full h-full">Please wait</h1>
            </div>
          ) : (
            <>
              {image ? (
                <>
                  <div className="w-full h-[75px]">
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
                    dispatch(upload_product_image(e.target.files[0])).then(
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
            onClick={() => {
              if (product) {
                dispatch(
                  update_product({
                    id: product?.id,
                    name,
                    description,
                    price,
                    stocks,
                    image,
                    category,
                    store_id: product?.store_id,
                  })
                ).then((res: any) => {
                  if (res.error) {
                    dispatch(error(res.error.message));
                  } else {
                    setProduct(res.payload);
                    setShowUpdateModal(false);
                  }
                });
              }
            }}
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
