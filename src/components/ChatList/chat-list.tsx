import { Chat } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { ProductChat } from "../ProductChat/product-chat";

export const ChatList = ({ productId }: { productId: number }) => {
  const [chats, setChats] = useState<Chat[]>();

  const getChats = () => {
    axios
      .get(`api/chats?product=${productId}`)
      .then((res) => setChats(res.data));
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Чаты</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Чаты</DialogHeader>
        <ul className="flex flex-col gap-5">
          {chats
            ? chats.map((chat) => (
                <ProductChat
                  chatId={chat.id}
                  key={chat.id}
                  buttonText={`Чат ${chat.id}`}
                />
              ))
            : "Загрузка"}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
