"use client";
import { useEffect, useState } from "react";
import { ProductImage } from "../ui/product-image";
import { Product } from "@prisma/client";
import axios from "axios";
import { ProductChat } from "../ProductChat/product-chat";

export const ProductPage = ({ id }: { id: number }) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-5 mt-5 w-fit flex flex-col gap-5 sm:mx-auto">
      {product ? (
        <>
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <ProductImage
            src="/image-placeholder-product.png"
            alt="Фото товара"
          />
          <p>{product?.description}</p>
          <span className="text-xl">{product?.cost ? <span></span> : ""}</span>
          <ProductChat productId={id} />
        </>
      ) : (
        <p>Загрузка</p>
      )}
    </div>
  );
};
