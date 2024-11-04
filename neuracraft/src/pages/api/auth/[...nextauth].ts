import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token, user }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = user?.role ? user.role : token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async signIn(request) {
      if (!request.user.email) {
        return false;
      }

      const allowedUsers = await prisma.user.findMany({
        select: {
          email: true,
          isNewUser: true,
        },
      });
      const isAllowedToSignIn = allowedUsers.some(
        (allowedEmail) => allowedEmail.email === request.user.email
      );
      if (!isAllowedToSignIn) {
        return false;
      }

      const user = allowedUsers.find(
        (user) => user.email === request.user.email
      );
      if (request.account?.provider !== "email" && user?.isNewUser) {
        const username =
          request.user.username ??
          request.user.email.split("@")[0] ??
          request.user.email;
        await prisma.user.update({
          where: {
            email: request.user.email,
          },
          data: {
            username,
            image:
              request.user.image ??
              `https://api.dicebear.com/6.x/fun-emoji/png?seed=${username}`,
            isNewUser: false,
          },
        });
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
      maxAge: 24 * 60 * 60 * 30,
      sendVerificationRequest({ identifier, url, provider }) {
        CustomSendVerificationRequest({ identifier, url, provider });
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        const allowedUsers = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            role: true,
            username: true,
            image: true,
          },
        });

        const user = allowedUsers.find(
          (user) => user.email === credentials.email
        );

        if (!user) {
          throw new Error("No user found with this email");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/consent",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);