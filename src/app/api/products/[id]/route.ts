"use server";

import { PrismaClient } from "@prisma/client";
import { toInteger } from "lodash-es";
import { NextResponse } from "next/server";

const client = new PrismaClient();
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = toInteger(params.id);

  await client.$connect();

  const product = await client.product.findFirst({ where: { id: id } });

  await client.$disconnect();

  return NextResponse.json(product);
};
