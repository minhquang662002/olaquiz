import { FC, SetStateAction, Dispatch, useState, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import AlertDialog from "../../AlertDialog";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  handleClose,
  handleCreateExercise,
  handleFiles,
} from "../../../utils/fns";
import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { PracticeTopic } from "@prisma/client";
import { readExcel } from "../../../utils/fns";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PracticeExerciseCreateModal: FC<Props> = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [practiceName, setPracticeName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const { data } = useQuery({
    queryKey: ["practiceTypes", selectedType],
    queryFn: () => {
      return axios.get(`/api/admin/practice/topic?type=${selectedType}`);
    },
    enabled: !!selectedType,
  });
  const excelRef = useRef<any>([]);
  const imageRef = useRef<any>([]);
  const createMutation = useMutation({
    mutationFn: () =>
      handleCreateExercise(
        practiceName,
        selectedTopic,
        excelRef.current,
        imageRef.current
      ),
    onSuccess: () => {
      queryClient.invalidateQueries("adminData");
      toast.success("Tạo thành công!");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error as string);
    },
  });
  return (
    <>
      {openDialog && (
        <AlertDialog setOpen={setOpen} setOpenDialog={setOpenDialog} />
      )}
      <Modal
        open={open}
        onClose={() =>
          handleClose(
            { name: practiceName, type: selectedType, selectedTopic },
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
              Tạo bài tập
            </Typography>

            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() =>
                handleClose(
                  { name: practiceName, type: selectedType, selectedTopic },
                  setOpen,
                  setOpenDialog
                )
              }
            />
          </Box>
          <label>Tên bài tập:</label>
          <br />
          <input
            type="text"
            value={practiceName}
            onChange={(e) => setPracticeName(e.target.value)}
          />
          <br />
          <label>Loại bài tập:</label>
          <br />
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value as string);
            }}
            style={{ textTransform: "capitalize" }}
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
          <br />
          <label>Chủ đề: </label>
          <br />
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value as string);
            }}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            {data?.data?.map((item: PracticeTopic) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          <label>File excel: </label>
          <br />
          <input
            type="file"
            onChange={async (e) => {
              if (e?.target?.files?.length) {
                const data = await readExcel(e.target.files?.[0] as File);
                excelRef.current = data;
              }
            }}
          />
          <br />
          <label>File hình ảnh: </label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFiles(imageRef, e.target.files, "image")}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 8, width: "100%" }}
            onClick={() => createMutation.mutate()}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PracticeExerciseCreateModal;
