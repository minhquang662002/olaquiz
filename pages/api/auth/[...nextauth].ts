import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../utils/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findFirst({
          where: { email },
        });
        console.log(password);
        if (!user) {
          throw Error("This email does not exist!");
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        console.log(user.password);
        if (!isCorrectPassword) {
          throw Error("Email or password is incorrect!");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt(params) {
      if (params.user) {
        params.token.user = params.user;
      }
      return params.token;
    },
    session(params) {
      //@ts-ignore
      params.session.user = params.token.user;

      return params.session;
    },
  },
};

export default NextAuth(authOptions);
