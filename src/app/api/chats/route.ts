"use server";
import { PrismaClient } from "@prisma/client";
import { toNumber } from "lodash-es";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const userName = params.get("user");
  const productId = toNumber(params.get("product"));
  if (userName) {
    await client.$connect();

    const productsIds = (
      await client.product.findMany({
        where: { userName: userName },
        select: { id: true },
      })
    ).map((productId) => productId.id);
    const chats = await client.chat.findMany({
      where: { productId: { in: productsIds } },
    });

    await client.$disconnect();
    return NextResponse.json(chats);
  } else if (productId) {
    await client.$connect();

    const chats = await client.chat.findMany({
      where: { productId: productId },
    });

    await client.$disconnect();

    return NextResponse.json(chats);
  }
};
