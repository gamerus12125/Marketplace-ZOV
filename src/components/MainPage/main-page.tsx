"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export const MainPage = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <main className="mt-20">
      <div className="mx-auto w-fit p-1">
        <h1 className="text-3xl font-bold">ZOV Market</h1>
        <span className="text-center">
          Удобный, простой, функциональный маректплейс для продажи.
        </span>
      </div>
      <div className="flex gap-1 mt-20 w-fit mx-auto sm:mt-52">
        <Input
          type="text"
          placeholder="Поиск"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={() => router.push(`/catalog?search=${search}`)}
        >
          Найти
        </Button>
      </div>
    </main>
  );
};
