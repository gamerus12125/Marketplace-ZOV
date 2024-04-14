"use client";

import { Product } from "@/lib/types";
import { useState } from "react";
import { ProductItem } from "../ProductItem/product-item";

const initProducts: Product[] = [{
  id: 1,
  title: "Крутая штука",
  description: "Очень крутая вещь покупайте",
  cost: 1000,
  creation_date: "13.04.2024",
},
{
    id: 2,
    title: "Крутая штука 2 klhbjekb  bbhrkjhbsejk klbjkihbr lkjile",
    description: "КРУТО",
    cost: 999,
    creation_date: "13.04.2024",
  },
];

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>(initProducts);
  return (
    <main>
      <h1 className="text-3xl text-center mt-20 font-bold">Каталог</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-10 px-2 gap-3 sm:gap-0 justify-items-center">
        {products.map((product) => (
          <li><ProductItem product={product} key={product.id} /></li>
        ))}
      </ul>
    </main>
  );
};
