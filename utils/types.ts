
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

export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
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
    image: string;
    summary: string;
    content: string;
    createdAt?: string | Date | undefined;
    updatedAt?: string | Date | undefined;
}


import { DefaultUser } from "next-auth";

declare module "next-auth" {    
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser & IUser
  }
}