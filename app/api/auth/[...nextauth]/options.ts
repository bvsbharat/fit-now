import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if the user has completed the fitness questionnaire
      console.log("user", user);
      const fitnessProfile = await prisma.fitnessProfile.findUnique({
        where: { userId: user.id },
      });
      if (!fitnessProfile) {
        return '/fitness-questionnaire';
      }
      return true;
    },
  },
};