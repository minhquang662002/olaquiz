
export interface LoginProps{
    email: string;
    password: string;
}

export interface RegisterProps{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface ITopic {
  id: string;
  title: string;
  image: string
}

export interface IUser{
  
    id: string;
    role: {
        name: string;
    };
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;

}

export interface ICategory{
  id: string
  name: string
  url: string
  type: string
}

export interface IPost{
    id?: string | undefined;
    title: string;
    category: string;
    image: string | File;
    summary: string;
    content: string;
    createdAt?: string | Date | undefined;
    updatedAt?: string | Date | undefined;
}


import { User } from "@prisma/client";
import { DefaultUser } from "next-auth";

declare module "next-auth" {    
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & User
  }
}