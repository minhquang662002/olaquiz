import {
  Modal,
  Box,
  Divider,
  TextareaAutosize,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useState, useContext, SetStateAction, useMemo } from "react";
import dynamic from "next/dynamic";
import { imageValidation, handleCreatePost } from "../../../utils/fns";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";
import CloseIcon from "@mui/icons-material/Close";
import AlertDialog from "../../AlertDialog";
const ReactQuill = dynamic(() => import("../Editor"), {
  ssr: false,
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface PreviewProps {
  title: string;
  image: any;
  summary: string;
  category: string;
}

const PostCreateModal: NextPage<Props> = ({ open, setOpen }) => {
  const [post, setPost] = useState<PreviewProps>({
    title: "",
    image: null,
    summary: "",
    category: "",
  });
  const [content, setContent] = useState<string>("");

  const { setIsLoading } = useContext(GlobalContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CATEGORIES = useMemo(
    () => [
      {
        name: "Giới thiệu về TOEIC",
        url: "/toeic_info",
      },
      {
        name: "Mẹo thi TOEIC",
        url: "/toeic_tips",
      },
      {
        name: "Ngữ pháp",
        url: "/grammar",
      },
    ],
    []
  );
  const handleClose = () => {
    if (Object.values(post).some((item) => item) || content.length) {
      setOpenDialog(true);
    } else {
      setOpen(false);
    }
  };
  return (
    <>
      {openDialog && (
        <AlertDialog setOpen={setOpen} setOpenDialog={setOpenDialog} />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            background: "white",
            overflowX: "hidden",
            padding: 2,
            height: 700,
            width: 1000,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bolder",
              }}
            >
              Create post
            </Typography>

            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" fontWeight="500">
            Xem trước
          </Typography>
          <Box sx={{ display: "flex", gap: 5, height: 500 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "60%",
                fontSize: 14,
              }}
            >
              <label>Tiêu đề:</label>
              <input
                type="text"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setPost((state) => ({ ...state, title: e.target.value }))
                }
              />
              <label>Hình ảnh:</label>
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
                    setPost((state) => ({
                      ...state,
                      image: Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      }),
                    }));
                  }
                }}
              />
              <label>Tiêu mục:</label>
              <select
                value={post.category}
                onChange={(e) =>
                  setPost((state) => ({ ...state, category: e.target.value }))
                }
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                {CATEGORIES.map((item) => (
                  <option key={item.name} value={item.url}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label>Tóm tắt:</label>
              <TextareaAutosize
                style={{ flexGrow: 1, resize: "none", outline: "none" }}
                onChange={(e) =>
                  setPost((state) => ({ ...state, summary: e.target.value }))
                }
              />
            </Box>
            <Card sx={{ width: "40%", maxHeight: "100%" }}>
              <CardMedia
                component="img"
                sx={{ maxHeight: 250 }}
                src={
                  post.image?.preview ||
                  "https://www.pays-sud-charente.com/inc/image/img_actualite/defaut.png"
                }
              />
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.summary}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" fontWeight="500">
            Nội dung bài viết
          </Typography>
          <ReactQuill setContent={setContent} />

          <Button
            variant="contained"
            sx={{ marginTop: 8, width: "100%" }}
            onClick={() => {
              setIsLoading(true);
              handleCreatePost({ ...post, content });
              setIsLoading(false);
            }}
          >
            Create post
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PostCreateModal;
