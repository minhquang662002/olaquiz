import { RegisterProps, IPost } from "./types";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export const register = async (formValue: RegisterProps) => {
  try {
    const res = await axios.post("/api/auth/register", formValue);
    toast.success("Register successfully!");
    signIn("credentials", {
      email: res.data.email,
      password: formValue.password,
      redirect: false,
    });
  } catch (error) {
    //@ts-ignore
    toast.error(error?.response?.data as string);
  }
};

// export const createCategory = async (category: Prisma.CategoryCreateInput) => {
//     try {
//       if(!category.url.trim() || !category.name.trim() || !category.type){
//         return toast.error("Missing field!");
//       }
//       const res = await axios.post("/api/category/createCategory", category)
//       return toast.success(res.data)
//     } catch (error) {
//       //@ts-ignore
//       return toast.error(error?.response?.data as string)
//     }
//   }

export const createTopic = async (topic: any, vocabularies: any) => {
  try {
    await axios.post("/api/vocabulary/createVocabulary", {
      topic,
      vocabularies,
    });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return toast.error(error?.response?.data as string);
  }
};

export const getTopic = async (id: string) => {
  try {
    const res = await axios.get(`/api/topic?id=${id}`);
    return res.data;
  } catch (error) {
    //@ts-ignore
    return toast.error(error?.response?.data as string);
  }
};

export const deleteTopic = async (id: string) => {
  try {
    const res = await axios.delete(`/api/topic/delete/${id}`);
    return toast.success(res.data);
  } catch (error) {
    //@ts-ignore
    return toast.error(error?.response?.data as string);
  }
};