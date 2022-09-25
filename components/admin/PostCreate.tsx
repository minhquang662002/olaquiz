import {
  Box,
  TextareaAutosize,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ICategory } from "../../utils/types";
import { createPost } from "../../utils/api";
import { imageValidation } from "../../utils/fns";
import { toast } from "react-toastify";
import { uploadFiles } from "../../utils/fns";

const ReactQuill = dynamic(() => import("./ReactQuill"), {
  ssr: false,
});

interface Props {
  categories: ICategory[];
}

interface PreviewProps {
  title: string;
  image: any;
  summary: string;
}

const PostCreate: NextPage<Props> = ({ categories }) => {
  const [preview, setPreview] = useState<PreviewProps>({
    title: "",
    image: null,
    summary: "",
  });
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleCreatePost = async () => {
    try {
      if (
        !preview.title.trim() ||
        !preview.image ||
        !preview.summary.trim() ||
        !category ||
        !content.trim()
      ) {
        return toast.error("Missing info!");
      } else {
        const image = await uploadFiles([preview.image]);
        await createPost({ ...preview, image: image[0], category, content });
      }
    } catch (error) {
      return toast.error("Error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 5,
        gap: 5,
        overflow: "hidden",
      }}
    >
      <Typography variant="h4">Preview</Typography>
      <Box sx={{ display: "flex", gap: 5, height: 500 }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
          <label>Title:</label>
          <input
            type="text"
            style={{ width: "100%" }}
            onChange={(e) =>
              setPreview((state) => ({ ...state, title: e.target.value }))
            }
          />
          <label>Image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                let file = e.target.files[0];
                const error = imageValidation(file);
                if (error) {
                  return toast.error(error);
                }
                setPreview((state) => ({
                  ...state,
                  image: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  }),
                }));
              }
            }}
          />
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            {categories.map((item: ICategory) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label>Summary:</label>
          <TextareaAutosize
            style={{ flexGrow: 1, resize: "none" }}
            onChange={(e) =>
              setPreview((state) => ({ ...state, summary: e.target.value }))
            }
          />
        </Box>
        <Card sx={{ width: "40%", maxHeight: "100%" }}>
          <CardMedia
            component="img"
            sx={{ maxHeight: 250 }}
            src={
              preview.image?.preview ||
              "https://www.pays-sud-charente.com/inc/image/img_actualite/defaut.png"
            }
          />
          <CardContent>
            <Typography variant="h6">{preview.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {preview.summary}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Typography>Post content</Typography>
      <ReactQuill setContent={setContent} />
      <Button sx={{ marginTop: 10 }} onClick={() => handleCreatePost()}>
        Create post
      </Button>
    </Box>
  );
};

export default PostCreate;
