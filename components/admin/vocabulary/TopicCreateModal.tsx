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
import {
  FC,
  SetStateAction,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-toastify";
import {
  imageValidation,
  handleClose,
  uploadFiles,
  readExcel,
  handleCreateTopic,
} from "../../../utils/fns";
import { createTopic } from "../../../utils/api";
import AlertDialog from "../../AlertDialog";
import { GlobalContext } from "../../context/GlobalContext";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface PreviewProps {
  title: string;
  image: any;
}

const TopicCreateModal: FC<Props> = ({ open, setOpen }) => {
  const [topic, setTopic] = useState<PreviewProps>({
    title: "",
    image: null,
  });
  const { setIsLoading } = useContext(GlobalContext);
  const [openDialog, setOpenDialog] = useState(false);

  const vocabularies = useRef<any>([]);
  const audioFiles = useRef<any>([]);
  const imageFiles = useRef<any>([]);
  return (
    <>
      {openDialog && (
        <AlertDialog setOpen={setOpen} setOpenDialog={setOpenDialog} />
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
              Tạo chủ đề
            </Typography>

            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleClose(topic, setOpen, setOpenDialog)}
            />
          </Box>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6" fontWeight="500">
            Nội dung
          </Typography>
          <Box sx={{ display: "flex", gap: 5, height: 480 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "60%",
                fontSize: 14,
              }}
            >
              <label>Chủ đề:</label>
              <input
                type="text"
                style={{ width: "100%" }}
                value={topic.title}
                onChange={(e) =>
                  setTopic((state) => ({ ...state, title: e.target.value }))
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
                    setTopic((state) => ({
                      ...state,
                      image: Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      }),
                    }));
                  }
                }}
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
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.some((item) => !item.type.startsWith("image")))
                    return toast.error("Files must be image");
                  imageFiles.current = files;
                }}
              />
              <label>File nghe: </label>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.some((item) => !item.type.startsWith("audio")))
                    return toast.error("Files must be audio");
                  audioFiles.current = files;
                }}
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
              <CardContent>
                <Typography variant="h6">{topic.title}</Typography>
              </CardContent>
            </Card>
          </Box>

          <Button
            variant="contained"
            sx={{ marginTop: 8, width: "100%" }}
            onClick={async () => {
              setIsLoading(true);
              await handleCreateTopic(
                topic,
                vocabularies.current,
                imageFiles.current,
                audioFiles.current
              );
              setIsLoading(false);
              setOpen(false);
            }}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TopicCreateModal;
