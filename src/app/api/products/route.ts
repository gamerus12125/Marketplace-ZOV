"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();
export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const search = params.get("search");
  const userName = params.get("user");
  await client.$connect();

  const products = await (search == null
    ? client.product.findMany({ where: userName ? { userName: userName } : {} })
    : client.product.findMany({
        where: {
          title: { contains: search },
          userName: userName ? userName : {},
        },
      }));

  await client.$disconnect();

  return NextResponse.json(products);
};
