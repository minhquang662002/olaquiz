import axios from "axios";
import {toast} from "react-toastify"

export const uploadFiles = async (files: File[]) : Promise<string[]> => {
  let upFiles = [];
  try {
    for (const item of files) {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", "aiee6fhb");
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

// const handleCreatePost = async () => {
//   try {
//     if (
//       !preview.title.trim() ||
//       !preview.image ||
//       !preview.summary.trim() ||
//       !category ||
//       !content.trim()
//     ) {
//       return toast.error("Missing info!");
//     } else {
//       const image = await uploadFiles([preview.image]);
//       await createPost({ ...preview, image: image[0], category, content });
//     }
//   } catch (error) {
//     return toast.error("Error");
//   }
// };
  