"use client";
import { useAppSession } from "@/auth/session/use-app-session";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { ProfileAddProduct } from "../ProfileAddProduct/profile-add-product";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import axios from "axios";
import { ProductItem } from "../ProductItem/product-item";
import { ChatList } from "../ChatList/chat-list";

export const ProfilePage = () => {
  const [products, setProducts] = useState<Product[] | null>();
  const session = useAppSession();

  const getProducts = () => {
    axios
      .get(`api/products?user=${session.data?.user?.name}`)
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="ml-10 my-10">
      <h1 className="text-3xl">Профиль {session.data?.user?.name}</h1>
      <section className="my-10">
        <h2 className="text-2xl">Ваши товары</h2>
        <ProfileAddProduct className="mt-10" />
        <ul className="flex gap-5 overflow-x-scroll my-10">
          {products ? (
            products.map((product) => (
              <li key={product.id} className="flex flex-col gap-3">
                <ProductItem product={product} />
                <ChatList productId={product.id} />
              </li>
            ))
          ) : (
            <p>Загрузка</p>
          )}
        </ul>
      </section>
      <div className="flex flex-col gap-5 w-fit my-10">
        <div className="flex items-center justify-between gap-5">
          <Label htmlFor="email">Почта</Label>
          <Input
            id="email"
            placeholder={session.data?.user?.email as undefined | string}
            type="email"
            disabled
            className="w-fit"
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            placeholder={session.data?.user?.name as undefined | string}
            type="text"
            disabled
            className="w-fit"
          />
        </div>
      </div>
      <Button type="button" onClick={() => signOut()}>
        Выйти
      </Button>
    </main>
  );
};
