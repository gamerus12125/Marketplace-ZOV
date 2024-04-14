import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"
import { AuthOptions } from "next-auth"
 
const prisma = new PrismaClient()
export const nextAuthConfig = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
}
