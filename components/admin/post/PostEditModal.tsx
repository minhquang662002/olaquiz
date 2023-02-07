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
  Skeleton,
} from "@mui/material";
import {
  useState,
  useContext,
  SetStateAction,
  useMemo,
  useEffect,
  FC,
} from "react";
import dynamic from "next/dynamic";
import { handlePreviewImage, uploadFiles } from "../../../utils/fns";
import { GlobalContext } from "../../context/GlobalContext";
import CloseIcon from "@mui/icons-material/Close";
import AlertDialog from "../../AlertDialog";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Editor = dynamic(() => import("../Editor"), {
  ssr: false,
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  itemId?: string;
}

interface PreviewProps {
  title: string;
  image: any;
  summary: string;
  category: string;
}

const PostEditModal: FC<Props> = ({ itemId, open, setOpen }) => {
  const [post, setPost] = useState<PreviewProps>({
    title: "",
    image: null,
    summary: "",
    category: "",
  });

  const [content, setContent] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["adminData", itemId],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/admin/post/${itemId}`);
        return res.data;
      } catch (error) {
        //@ts-ignore
        toast.error((error?.response?.data as string) || "");
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!itemId,
  });
  useEffect(() => {
    if (data) {
      setPost({
        title: data.title,
        image: data.image,
        category: data.category,
        summary: data.summary,
      });
      setContent(data.content);
    }
  }, [data]);
  const queryClient = useQueryClient();
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

  const cancelFn = async () => {
    setOpenDialog(false);
    setOpen(false);
  };
  const progressFn = () => {
    setOpenDialog(false);
  };

  const updateMutation = useMutation({
    mutationFn: async (id: string) => {
      setIsLoading(true);
      await axios.patch(`/api/admin/post/${id}`, {
        content,
        ...post,
        image:
          typeof post.image == "string"
            ? post.image
            : await uploadFiles([post.image as File]),
      });
      setIsLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("adminData");
      toast.success("Sửa thành công!");
      setIsLoading(false);
      setOpen(false);
    },
    onError: () => {
      toast.error("Lỗi");
      setIsLoading(false);
    },
  });

  return (
    <>
      {openDialog && (
        <AlertDialog
          title={"Thoát"}
          content={"Bạn đang sửa bài. Bạn có chắc là muốn thoát?"}
          progressTitle="Tiếp tục"
          cancelTitle="Thoát"
          progressFn={progressFn}
          cancelFn={cancelFn}
        />
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
              Sửa bài viết
            </Typography>

            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
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
                value={post.title}
              />
              <label>Hình ảnh:</label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) =>
                  handlePreviewImage(e.target.files as FileList, setPost)
                }
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
                value={post.summary}
              />
            </Box>
            <Card sx={{ width: "40%", maxHeight: "100%" }}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ height: 250, marginBottom: 2 }}
                />
              ) : (
                <CardMedia
                  component="img"
                  sx={{ maxHeight: 250 }}
                  src={
                    typeof post.image == "string"
                      ? post.image
                      : post.image?.preview
                      ? post.image.preview
                      : "https://www.pays-sud-charente.com/inc/image/img_actualite/defaut.png"
                  }
                />
              )}

              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton
                      animation="wave"
                      height={20}
                      style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} />
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.summary}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" fontWeight="500">
            Nội dung bài viết
          </Typography>
          <Editor content={content} setContent={setContent} />
          <Button
            variant="contained"
            sx={{ marginTop: 8, width: "100%" }}
            onClick={() => updateMutation.mutate(itemId || "")}
          >
            Sửa
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PostEditModal;
