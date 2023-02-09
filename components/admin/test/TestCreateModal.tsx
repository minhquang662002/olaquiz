import { Modal, Box, Divider, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, SetStateAction, useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { handleClose, readExcel, handleCreateExam } from "../../../utils/fns";
import AlertDialog from "../../AlertDialog";
import { GlobalContext } from "../../context/GlobalContext";
import { handleFiles } from "../../../utils/fns";
import { useMutation, useQueryClient } from "react-query";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const TestCreateModal: FC<Props> = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useContext(GlobalContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  const excelRef = useRef<any>([]);
  const audioFiles = useRef<any>([]);
  const imageFiles = useRef<any>([]);
  const createMutation = useMutation({
    mutationFn: () =>
      handleCreateExam(
        testName,
        testType,
        excelRef.current,
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
          content={"Bạn đang tạo bài thi. Bạn có chắc là muốn thoát?"}
          progressTitle="Tiếp tục"
          cancelTitle="Thoát"
          progressFn={progressFn}
          cancelFn={cancelFn}
        />
      )}

      <Modal
        open={open}
        onClose={() => handleClose(testName, setOpen, setOpenDialog)}
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
              Tạo bài thi
            </Typography>

            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleClose(testName, setOpen, setOpenDialog)}
            />
          </Box>
          <Divider sx={{ marginY: 2 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              fontSize: 14,
            }}
          >
            <label>Tên bài thi:</label>
            <input
              type="text"
              style={{ width: "100%" }}
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
            <label>Dạng bài thi:</label>
            <select
              onChange={(e) => setTestType(e.target.value)}
              defaultValue={""}
            >
              <option disabled hidden value="">
                Dạng bài
              </option>
              <option value="full-test">Bài thi đầy đủ</option>
              <option value="mini-test">Bài thi nhỏ</option>
            </select>
            <label>File excel:</label>
            <input
              type="file"
              accept=".csv, .xlsx"
              onChange={async (e) => {
                if (e.target.files) {
                  if (
                    e.target.files[0].type !=
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ) {
                    return toast.error("File must be excel");
                  }
                  excelRef.current = await readExcel(e.target.files[0]);
                }
              }}
            />
            <label>File hình ảnh: </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFiles(imageFiles, e.target.files, "image")}
            />
            <label>File nghe: </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFiles(audioFiles, e.target.files, "audio")}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ marginTop: 4, width: "100%" }}
            onClick={() => createMutation.mutate()}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TestCreateModal;
