import NextAuth from "next-auth";
type NextAuthOptions = typeof NextAuth extends (options: infer T) => any ? T : never;
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/userSchema";

interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
}

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>> | undefined) {
        if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          return null;
        }

        const user = await User.findOne({ email: credentials.email }).lean<UserType | null>();
        if (user && typeof user.password === "string") {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) {
            return { id: user._id.toString(), email: user.email, name: user.username };
          }
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  secret: process.env.AUTH_SECRET, // Ensure this is set in your .env file
};
