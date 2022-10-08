import { FC, Dispatch, SetStateAction, useEffect } from "react";
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

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TopicEditModal: FC<Props> = ({ open, setOpen }) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Modal
      open={open}
      // onClose={() => handleClose(topic, setOpen, setOpenDialog)}
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
            Chỉnh sửa chủ đề
          </Typography>

          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
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
            {/* <input
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
                  const data = await readExcel(e.target.files?.[0] as File);
                  setVocabularies(data);
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
                  setImageFiles(Array.from(e.target.files || []));
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
                  setAudioFiles(Array.from(e.target.files || []));
                }}
              /> */}
          </Box>
          {/* <Card sx={{ width: "40%" }}>
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
            </Card> */}
        </Box>

        {/* <Button
            variant="contained"
            sx={{ marginTop: 8, width: "100%" }}
            onClick={async () => {
              if (!vocabularies || vocabularies.length == 0) {
                return toast.error("Excel file is required!");
              }
              if (imageFiles?.length == 0 || audioFiles?.length == 0)
                return toast.error("Image and audio files are required!");
              setIsLoading(true);
              const imageUrls = await uploadFiles(imageFiles as File[]);
              const audioUrls = await uploadFiles(audioFiles as File[]);
              const irls = imageUrls.map((item) =>
                Number(item.split("/").reverse()[0].split("_")[0])
              );

              const arls = audioUrls.map((item) =>
                Number(item.split("/").reverse()[0].split("_")[0])
              );
              setVocabularies((state: any) =>
                state.map((item: any) => {
                  let imagePos = irls.indexOf(item.STT);
                  let audioPos = arls.indexOf(item.STT);
                  return {
                    ...item,
                    image: imagePos != -1 ? imageUrls[imagePos] : "",
                    audio: audioPos != -1 ? imageUrls[imagePos] : "",
                  };
                })
              );
              setIsLoading(false);
              // createTopic(topic, vocabularies);
            }}
          >
            Tạo
          </Button> */}
      </Box>
    </Modal>
  );
};

export default TopicEditModal;
