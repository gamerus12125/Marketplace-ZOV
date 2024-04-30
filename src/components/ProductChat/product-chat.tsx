import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import axios from "axios";
import { useAppSession } from "@/auth/session/use-app-session";
import { Message } from "@prisma/client";
import { Send } from "lucide-react";

export const ProductChat = ({
  productId,
  chatId,
  buttonText,
}: {
  productId?: number;
  chatId?: number;
  buttonText?: string;
}) => {
  const session = useAppSession();
  const [messages, setMessages] = useState<Message[]>();
  const [message, setMessage] = useState<string>();

  const sendMessage = (text: string, authorName: string, chatId?: number) => {
    if (chatId) {
      axios
        .post("/api/messages", {
          text: text,
          authorName: authorName,
          chatId: chatId,
        })
        .then((res) => getMessages());
    } else {
      axios
        .post("/api/messages", {
          text: text,
          authorName: authorName,
          productId: productId,
        })
        .then((res) => getMessages());
    }
  };

  const getMessages = () => {
    if (productId) {
      axios(
        `/api/messages?initiator=${session.data?.user?.name}&product=${productId}`
      )
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    } else {
      axios(`/api/messages?&chat=${chatId}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (session.data?.user?.name) {
      getMessages();
    }
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          {buttonText ? buttonText : "Написать продавцу"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Чат с продавцом</DialogTitle>
        </DialogHeader>
        <div className="border-foreground border-2 p-2 flex flex-col justify-between">
          <div className="overflow-y-scroll h-96">
            {messages
              ? messages.map((mes) => (
                  <div
                    className={`my-2 flex ${
                      mes.authorName == session.data?.user?.name
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    key={mes.id}
                  >
                    <p className="bg-slate-600 p-3 rounded-md w-56 break-words">
                      {mes.text}
                    </p>
                  </div>
                ))
              : ""}
          </div>
          <div className="flex items-center">
            <Input onChange={(e) => setMessage(e.target.value)} />
            <Button
              variant={"ghost"}
              disabled={message ? false : true}
              className="cursor-pointer"
              onClick={() =>
                sendMessage(
                  message ?? "",
                  session.data?.user?.name ?? "",
                  messages?.length ? messages[0].chatId : undefined
                )
              }
            >
              <Send />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
