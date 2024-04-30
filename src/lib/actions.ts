"use server";
import { getAppSessionServer } from "@/auth/session/get-app-session.server";
import { PrismaClient, Product } from "@prisma/client";
import { toInteger } from "lodash-es";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createProduct(formData: FormData) {
  const session = await getAppSessionServer();
  await prisma.$connect();

  if (session?.user && session.user.email) {

    const userName = (
      await prisma.user.findFirst({
        where: { email: session.user.email },
      })
    )?.name;
    
    if (userName) {

      const rawFormData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        cost: toInteger(formData.get("cost")),
      };

      const now = new Date();

      const product: Omit<Product, "id"> = {
        ...rawFormData,
        creation_date: `${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`,
        userName: userName,
      };

      const newProduct = await prisma.product.create({ data: product });
      await prisma.$disconnect();

      revalidatePath("/catalog")
      redirect(`/catalog/${newProduct.id}`)
    }
  }
}
