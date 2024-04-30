import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();
export const nextAuthConfig = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],
  session: {
    strategy: "jwt",
    maxAge: 3000,
 },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.YANDEX_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "test@test.test" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.email &&
          credentials.username &&
          credentials.password
        ) {
          const isExist = await prisma.user.findFirst({
            where: { name: credentials.username },
          });

          console.log(isExist)
          if (!isExist) {
            const user = await prisma.user.create({
              data: { name: credentials.username, email: credentials.email, password: credentials.password },
            });
            return user;
          } else {
            const user = await prisma.user.findFirst({where: {email: credentials.email}})
            if (user?.password == credentials.password) {
              return user
            }
          }
        }
        return null;
      },
    }),
  ],
};
