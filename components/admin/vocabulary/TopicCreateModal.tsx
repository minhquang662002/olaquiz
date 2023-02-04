import {
  Modal,
  Box,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, SetStateAction, useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import {
  handleClose,
  readExcel,
  handleCreateTopic,
  handlePreviewImage,
} from "../../../utils/fns";
import AlertDialog from "../../AlertDialog";
import { GlobalContext } from "../../context/GlobalContext";
import { handleFiles } from "../../../utils/fns";
import { useMutation, useQueryClient } from "react-query";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface PreviewProps {
  title: string;
  image: any;
}

const TopicCreateModal: FC<Props> = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState<PreviewProps>({
    title: "",
    image: null,
  });
  const { setIsLoading } = useContext(GlobalContext);
  const [openDialog, setOpenDialog] = useState(false);
  const vocabularies = useRef<any>([]);
  const audioFiles = useRef<any>([]);
  const imageFiles = useRef<any>([]);

  const createMutation = useMutation({
    mutationFn: () =>
      handleCreateTopic(
        topic,
        vocabularies.current,
        imageFiles.current,
        audioFiles.current
      ),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("adminData");
      setIsLoading(false);
      toast.success("Thêm thành công");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error as string);
      setIsLoading(false);
    },
  });

  const cancelFn = () => {
    setOpenDialog(false);
    setOpen(false);
  };
  const progressFn = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <AlertDialog
          title={"Thoát"}
          content={"Bạn đang tạo bộ từ vựng. Bạn có chắc là muốn thoát?"}
          progressTitle="Tiếp tục"
          cancelTitle="Thoát"
          progressFn={progressFn}
          cancelFn={cancelFn}
        />
      )}

      <Modal
        open={open}
        onClose={() => handleClose(topic, setOpen, setOpenDialog)}
      >
        <Box
          sx={{
            background: "white",
            overflowX: "hidden",
            padding: 2,
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
              Tạo chủ đề
            </Typography>

            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleClose(topic, setOpen, setOpenDialog)}
            />
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" fontWeight="500">
            Thông tin
          </Typography>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "60%",
                fontSize: 14,
              }}
            >
              <label>Tên bộ từ vựng:</label>
              <input
                type="text"
                style={{ width: "100%" }}
                value={topic.title}
                onChange={(e) =>
                  setTopic((state) => ({ ...state, title: e.target.value }))
                }
              />
              <label>Hình ảnh minh họa:</label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) =>
                  handlePreviewImage(e.target.files as FileList, setTopic)
                }
              />
              <label>File từ vựng &#40;excel&#41;: </label>
              <input
                type="file"
                onChange={async (e) => {
                  if (e?.target?.files?.length) {
                    const data = await readExcel(e.target.files?.[0] as File);
                    vocabularies.current = data;
                  }
                }}
              />
              <label>File hình ảnh: </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                multiple
                onChange={(e) =>
                  handleFiles(imageFiles, e.target.files, "image")
                }
              />
              <label>File nghe: </label>
              <input
                type="file"
                accept="audio/*"
                multiple
                onChange={(e) =>
                  handleFiles(audioFiles, e.target.files, "audio")
                }
              />
            </Box>
            <Card sx={{ width: "40%" }}>
              <CardMedia
                component="img"
                src={
                  topic.image?.preview ||
                  "https://www.pays-sud-charente.com/inc/image/img_actualite/defaut.png"
                }
              />
              <CardContent sx={{ height: 60 }}>
                <Typography variant="h6" fontWeight="bolder">
                  {topic.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: 3 }}
            onClick={() => createMutation.mutate()}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TopicCreateModal;
