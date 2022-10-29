import { Dispatch } from 'react';
import { IPost } from './types';
import axios from "axios";
import {toast} from "react-toastify"
import { createPost } from "./api";
import * as XLSX from "xlsx";



export const uploadFiles = async (files: File[]) : Promise<string[]> => {
  let upFiles = [];
  try {
    for (const item of files) {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", "a2npymha");
        formData.append("cloud_name", "dd0w757jk");
        formData.append("folder", "olaquiz");

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dd0w757jk/upload",
            formData
          );
          upFiles.push(res.data.url);
    }
    
  } catch (error) {
    alert(error);
  }
  return upFiles
};

export const imageValidation = (file: File) => {
  if(file.type !== "image/png" && file.type !== "image/jpeg"){
    return "Image format must be .png or .jpeg";
  }
  if(file.size > 1024 * 1024 ){
    return "Image size must under or equal to 1MB";
  }
}


export const fileValidation = (file: File, extension: string[]) => {
  if(extension.some(item => file.type != item)){
    return `File format must be .${extension.join(",")}`;
  }
}

export const sizeValidation = (file: File, size: number) => {
  if(file.size > size * 1024 * 1024 ){
    return `File's size must under or equal to ${size}MB`;
  }
}

// export const postValidation = (preview, category, content) => {
//   if (
//     !preview.title.trim() ||
//     !preview.image ||
//     !preview.summary.trim() ||
//     !category ||
//     !content.trim()
//   ) {
//     return toast.error("Missing info!");
//   } else {
//     const image = await uploadFiles([preview.image]);
//     await createPost({ ...preview, image: image[0], category, content });
//   }
// }



export const handleCreatePost = async (post : IPost) => {
  try {
    const {title, image, summary, category, content} = post;
    if (
      !title.trim() ||
      !image ||
      !summary.trim() ||
      !category ||
      !content.trim()
    ) {
      return toast.error("Missing post information!");
    } 
    
    if(title.length > 100){
      return toast.error("Title must only contain 50 characters!");
    } 
    if(summary.length > 350){
      return toast.error("Summary must only contain 250 characters!")
    }
    else {
      const urls = await uploadFiles([image as File]);
      await createPost({ ...post, image: urls[0] });
    }
  } catch (error) {
    return toast.error("Error");
  }
};


export function createData(
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  role: string,

) {
  return { id, email, firstName, lastName, role };
}


export const handleClose = (state:any, setOpen:Dispatch<boolean>, setOpenDialog:Dispatch<boolean>) => {
  if (Object.values(state).some((item) => item)) {
    setOpenDialog(true);
  } else {
    setOpen(false);
  }
}

export const readExcel = (file: File) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target?.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  return promise;
};

export const handleCreateTopic = async (topic: any, vocabularies: any, imageFiles:any, audioFiles: any) => {
  try {
    if (!topic.title || !topic.image) {
      return toast.error("Missing topic info!");
    }
    if (!vocabularies.length) {
      return toast.error("Excel file is required!");
    }
    if (!imageFiles.length || !audioFiles.length)
      return toast.error("Image and audio files are required!");
    const prImgUrl = await uploadFiles([topic.image] as File[]);
    const imageUrls = await uploadFiles(imageFiles as File[]);
    const audioUrls = await uploadFiles(audioFiles as File[]);
    const irls = imageUrls.map((item) =>
      Number(item.split("/").reverse()[0].split("_")[0])
    );
    const arls = audioUrls.map((item) =>
      Number(item.split("/").reverse()[0].split("_")[0])
    );
    vocabularies = vocabularies.map((item: any) => {
      let imagePos = irls.indexOf(item.STT);
      let audioPos = arls.indexOf(item.STT);
      return {
        ...item,
        image: imagePos != -1 ? imageUrls[imagePos] : "",
        audio: audioPos != -1 ? audioUrls[audioPos] : "",
      };
    });

    const newTopic = (await axios.post("/api/topic", { topic: {...topic, image: prImgUrl[0]}, vocabularies: vocabularies })).data
    console.log(newTopic)

    return toast.success("Created successfully!")
  } catch (error) {
    console.log(error)
  }
}

export const handleCreateExam = async (testName: string, questions: any, imageFiles:any, audioFiles: any) => {
  try {

    const imageUrls = await uploadFiles(imageFiles as File[]);
    const audioUrls = await uploadFiles(audioFiles as File[]);
    const irls = imageUrls.map((item) =>
      Number(item.split("/").reverse()[0].split("_")[0])
    );
    const arls = audioUrls.map((item) =>
      Number(item.split("/").reverse()[0].split("_")[0])
    );
    questions = questions.map((item: any) => {
      let imagePos = irls.indexOf(item.STT);
      let audioPos = arls.indexOf(item.STT);
      return {
        ...item,
        image: imagePos != -1 ? imageUrls[imagePos] : "",
        audio: audioPos != -1 ? audioUrls[audioPos] : "",
      };
    });
    questions = questions.map(({STT, ...item}:any ) => item)

    await axios.post(`/api/test`, {questions, testName})
    return toast.success("Created successfully!")
  } catch (error) {
    console.log(error)
  }
}

export const submitTest = async (score: number, userId: string, testId: string, answeredList: Map<number, string>) => {
  try {
    const answeredArr = Array.from(answeredList, ([number, answer]) => ({number, answer}))
    await axios.post("/api/result", {
      score,
      userId,
      testId,
      answeredArr
    })
  } catch (error) {
    console.log(error)
    return toast.error("Error")
  }
}