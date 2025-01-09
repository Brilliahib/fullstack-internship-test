import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuthApiHandler } from "@/http/auth/get-auth";
import { loginApiHandler } from "@/http/auth/login";
import { LoginType } from "@/validators/auth/login-validator";
import { Auth } from "@/types/auth/auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    username: string;
    phone: string;
    email: string;
    token: string;
  }

  interface Session {
    user: Omit<User, "token">;
    access_token: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as LoginType;
        if (!username || !password) return null;

        try {
          const response = await loginApiHandler({ username, password });
          const { token, user } = response;

          if (!user || !token) return null;

          return {
            ...user,
            token,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user.token;
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const access_token = token.access_token as string;
      session.access_token = access_token;

      session.user = {
        id: token.sub as string,
        name: token.name as string,
        username: token.username as string,
        phone: token.phone as string,
        email: token.email as string,
      };

      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export default authHandler;
