"use server";
import { PrismaClient } from "@prisma/client";
import { toInteger } from "lodash-es";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const initiatorName = params.get("initiator");
  const productId = toInteger(params.get("product"));
  const chatId = toInteger(params.get("chat"));

  if (initiatorName && productId) {
    await client.$connect();

    const initiatorId = (
      await client.user.findFirst({ where: { name: initiatorName } })
    )?.id;

    if (initiatorId != null) {
      const chatMessages = await client.chat.findFirst({
        where: { initiatorId: initiatorId, productId: productId },
        select: { messages: true },
      });
      await client.$disconnect();
      return NextResponse.json(chatMessages?.messages);
    }
  } else if (chatId) {
    await client.$connect();

    const messages = (
      await client.chat.findFirst({
        where: { id: chatId },
        select: { messages: true },
      })
    )?.messages;

    return NextResponse.json(messages);
  }
  return NextResponse.error();
};

export const POST = async (req: NextRequest) => {
  const data: {
    text: string | undefined;
    authorName: string | undefined;
    chatId: string | undefined;
    productId: string | undefined;
  } = await req.json();

  await client.$connect();

  if (data.text && data.authorName && data.chatId) {
    await client.message.create({
      data: {
        chatId: toInteger(data.chatId),
        text: data.text,
        authorName: data.authorName,
      },
    });

    return NextResponse.json({ status: "success" });
  } else if (data.authorName && data.text && data.productId) {
    const initiatorId = (
      await client.user.findFirst({
        where: { name: data.authorName },
        select: { id: true },
      })
    )?.id;
    if (initiatorId) {
      const newChat = await client.chat.create({
        data: {
          initiatorId: initiatorId,
          productId: toInteger(data.productId),
        },
      });
      await client.message.create({
        data: {
          authorName: data.authorName,
          text: data.text,
          chatId: newChat.id,
        },
      });
      await client.$disconnect();
      return NextResponse.json({ status: "success" });
    }
  }
  await client.$disconnect();
  return NextResponse.json({ status: "error" });
};
