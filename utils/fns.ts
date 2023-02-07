import { Dispatch } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export const uploadFiles = async (files: File[]): Promise<string[]> => {
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
  return upFiles;
};

export const imageValidation = (file: File) => {
  if (file.type !== "image/png" && file.type !== "image/jpeg") {
    return "Image format must be .png or .jpeg";
  }
  if (file.size > 1024 * 1024) {
    return "Image size must under or equal to 1MB";
  }
};

export const fileValidation = (file: File, extension: string[]) => {
  if (extension.some((item) => file.type != item)) {
    return `File format must be .${extension.join(",")}`;
  }
};

export const sizeValidation = (file: File, size: number) => {
  if (file.size > size * 1024 * 1024) {
    return `File's size must under or equal to ${size}MB`;
  }
};

export const handlePreviewImage = (files: FileList, setState: any) => {
  if (files && files.length > 0) {
    let file = files[0];
    const error = imageValidation(file);
    if (error) {
      return toast.error(error);
    }
    setState((state: any) => ({
      ...state,
      image: Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    }));
  }
};

export const handleCreatePost = async (post: any) => {
  try {
    const { title, image, summary, category, content } = post;
    if (
      !title.trim() ||
      !image ||
      !summary.trim() ||
      !category ||
      !content.trim()
    ) {
      return Promise.reject("Thiếu thông tin cho bài viết");
    }

    if (title.length > 100) {
      return Promise.reject("Tiêu đề chỉ được tối đa 100 ký tự");
    }
    if (summary.length > 500) {
      return Promise.reject("Tóm tắt tối đa chỉ được 500 ký tự");
    } else {
      const urls = await uploadFiles([image as File]);
      if (!urls[0]) {
        return toast.error("Lỗi");
      }
      await axios.post("/api/admin/post", { ...post, image: urls[0] });
    }
  } catch (error) {
    return Promise.reject("Lỗi hệ thống");
  }
};

export const handleClose = (
  state: any,
  setOpen: Dispatch<boolean>,
  setOpenDialog: Dispatch<boolean>
) => {
  if (Object.values(state).some((item) => item)) {
    setOpenDialog(true);
  } else {
    setOpen(false);
  }
};

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

export const addToExcel = async (excel: any, files: any, type: string) => {
  const fileUrls = await uploadFiles(files);
  const irls = fileUrls.map((item) =>
    Number(item.split("/").reverse()[0].split("_")[0])
  );

  return excel.map((item: any) => {
    let pos = irls.indexOf(item.STT);
    return {
      ...item,
      [type]: pos != -1 ? fileUrls[pos] : "",
    };
  });
};

export const handleCreateTopic = async (
  topic: any,
  vocabularies: any,
  imageFiles: any,
  audioFiles: any
) => {
  try {
    if (!topic.title || !topic.image) {
      return Promise.reject("Thiếu thông tin cho bộ từ vựng");
    }
    if (!vocabularies.length) {
      return Promise.reject("Excel file is required!");
    }
    if (!imageFiles.length || !audioFiles.length) {
      return Promise.reject("Thiếu các file hình ảnh và audio");
    }

    const prImgUrl = await uploadFiles([topic.image] as File[]);

    vocabularies = await addToExcel(vocabularies, imageFiles, "image");
    vocabularies = await addToExcel(vocabularies, audioFiles, "audio");

    await axios.post("/api/admin/vocabulary", {
      topic: { ...topic, image: prImgUrl[0] },
      vocabularies,
    });
  } catch (error) {
    return Promise.reject((error as AxiosError)?.response?.data || "error");
  }
};

export const handleCreateExam = async (
  testName: string,
  testType: string,
  questions: any,
  imageFiles: any,
  audioFiles: any
) => {
  try {
    if (!testName) {
      return Promise.reject("Thiếu thông tin cho bài thi");
    }

    if (imageFiles.length > 0) {
      questions = await addToExcel(questions, imageFiles, "image");
    }
    questions = await addToExcel(questions, audioFiles, "audio");

    await axios.post(`/api/admin/test`, { questions, testName, testType });
  } catch (error) {
    return Promise.reject((error as AxiosError)?.response?.data || "error");
  }
};

export const handleCreateExercise = async (
  practiceName: string,
  topic: string,
  questions: any,
  imageFiles: any
) => {
  try {
    if (imageFiles.length > 0) {
      questions = await addToExcel(questions, imageFiles, "image");
    }

    await axios.post("/api/admin/practice/exercise", {
      topic,
      questions,
      practiceName,
    });
  } catch (error) {
    return Promise.reject((error as AxiosError)?.response?.data || "error");
  }
};

export const submitTest = async (
  score: number,
  testId: string,
  answeredList: Map<number, string>,
  time: number
) => {
  try {
    const answeredArr = Array.from(answeredList, ([number, answer]) => ({
      number,
      answer,
    }));
    await axios.post("/api/result", {
      score,
      testId,
      answeredArr,
      time,
    });
  } catch (error) {
    return toast.error("Lỗi hệ thống");
  }
};

export const handleFiles = (ref: any, files: FileList | null, type: string) => {
  const fileArray = Array.from(files || []);
  if (fileArray.some((item) => !item.type.startsWith(type)))
    return toast.error(`Files must be ${type}`);
  ref.current = fileArray;
};
