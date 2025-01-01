import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID ?? "",
          clientSecret: process.env.GOOGLE_SECRET ?? ""
        })
    ],
    secret:process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks:{
      async signIn(params) {
        await prismaClient.user.create({
          data:{
            email: params.user.email ?? "",
            provider:"Google"
          }
        })
        return true;
      },
    }
})

export { handler as GET, handler as POST }