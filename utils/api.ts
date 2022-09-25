import { Prisma } from '@prisma/client';
import { RegisterProps, IPost } from './types';
import axios from 'axios';
import {signIn} from "next-auth/react"
import {toast} from 'react-toastify'

export const register = async (formValue: RegisterProps) => {
    try {
        const res = await axios.post("/api/auth/register", formValue)
        toast.success("Register successfully!")
        signIn("credentials", {email: res.data.email, password: formValue.password, redirect: false})
        
    } catch (error) {
        //@ts-ignore
        toast.error(error?.response?.data as string)
    }
}

export const createCategory = async (category: Prisma.CategoryCreateInput) => {
    try {
      if(!category.url.trim() || !category.name.trim() || !category.type){
        return toast.error("Missing field!");
      }
      const res = await axios.post("/api/category/createCategory", category)
      return toast.success(res.data)
    } catch (error) {
      //@ts-ignore
      return toast.error(error?.response?.data as string)
    }
  }



export const createPost = async (post: IPost) => {
    try {
      const {title, category, summary, content, image} = post
      console.log(title, category, summary, content, image)
      if(!title.trim() || !category || !summary.trim() || !content.trim() || !image){
        return toast.error("Missing data!");
      }
      await axios.post("/api/post/createPost", post);
      return toast.success("Created post successfully!")
    } catch (error) {
      console.log(error)
        //@ts-ignore
        return toast.error(error?.response?.data as string)
    }
}

