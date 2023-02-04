import { FC, SetStateAction, Dispatch, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import AlertDialog from "../../AlertDialog";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { handleClose } from "../../../utils/fns";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PracticeTopicCreateModal: FC<Props> = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [topicName, setTopicName] = useState<string>("");
  const [topicType, setTopicType] = useState<string>("");
  const createMutation = useMutation({
    mutationFn: (arg: any) => {
      return axios.post(`/api/admin/practice/topic`, arg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("adminData");
      toast.success("Tạo thành công!");
      setOpen(false);
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
          title={"Hủy bài"}
          content={"Bạn tạo chủ đề bài luyện tập. Bạn có chắc là muốn thoát?"}
          progressTitle="Tiếp tục viết"
          cancelTitle="Thoát"
          progressFn={progressFn}
          cancelFn={cancelFn}
        />
      )}
      <Modal
        open={open}
        onClose={() =>
          handleClose(
            { name: topicName, type: topicType },
            setOpen,
            setOpenDialog
          )
        }
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
              onClick={() =>
                handleClose(
                  { name: topicName, type: topicType },
                  setOpen,
                  setOpenDialog
                )
              }
            />
          </Box>
          <label>Tên chủ đề:</label>
          <br />
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <br />
          <label>Loại chủ đề:</label>
          <br />
          <select
            value={topicType}
            style={{ textTransform: "uppercase" }}
            onChange={(e) => {
              setTopicType(e.target.value as string);
            }}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            {["grammar", "vocabulary"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Button
            variant="contained"
            sx={{ marginTop: 8, width: "100%" }}
            onClick={() => {
              createMutation.mutate({ topicName, topicType });
            }}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PracticeTopicCreateModal;
