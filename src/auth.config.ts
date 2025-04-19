import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = await User.findOne({ email: credentials.email }).lean();

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (isMatch) {
              return {
                id: user._id.toString(),
                email: user.email,
                name: user.username,
              };
            } else {
              console.log("Email or password is incorrect");
              return null;
            }
          } else {
            console.log("User not found");
            return null;
          }
        } catch (error) {
          console.log("An error occurred in authorize:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);