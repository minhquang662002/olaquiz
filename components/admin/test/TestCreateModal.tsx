import { Modal, Box, Divider, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, SetStateAction, useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import {
  imageValidation,
  fileValidation,
  handleClose,
  readExcel,
  handleCreateExam,
} from "../../../utils/fns";
import AlertDialog from "../../AlertDialog";
import { GlobalContext } from "../../context/GlobalContext";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const TestCreateModal: FC<Props> = ({ open, setOpen }) => {
  const { setIsLoading } = useContext(GlobalContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  console.log(testType);
  const excelRef = useRef<any>([]);
  const audioFiles = useRef<any>([]);
  const imageFiles = useRef<any>([]);

  return (
    <>
      {openDialog && (
        <AlertDialog setOpen={setOpen} setOpenDialog={setOpenDialog} />
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
            <select onChange={(e) => setTestType(e.target.value)}>
              <option disabled defaultChecked>
                Dạng bài
              </option>
              <option value="full-test">Full test</option>
              <option value="mini-test">Mini test</option>
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
                  excelRef.current = readExcel(e.target.files[0]);
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

          <Button
            variant="contained"
            sx={{ marginTop: 4, width: "100%" }}
            onClick={async () => {
              setIsLoading(true);
              handleCreateExam(
                testName,
                excelRef.current,
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

export default TestCreateModal;
