"use client";

import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { ProductItem } from "../ProductItem/product-item";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>();
  const params = useSearchParams();
  const search = params.get("search") ?? "";

  useEffect(() => {
    axios
      .get(`/api/products?search=${search}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <h1 className="text-3xl text-center mt-20 font-bold">Каталог</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-10 px-2 gap-3 sm:gap-0 justify-items-center">
        {products ? (
          products.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} />
            </li>
          ))
        ) : (
          <p>Loading</p>
        )}
      </ul>
    </main>
  );
};
