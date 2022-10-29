import { useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Button } from "@mui/material";
import DataTable from "../DataTable";
import TestCreateModal from "./TestCreateModal";

const TestManagement = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  return (
    // <div>
    //   <input type="text" onChange={(e) => setTestName(e.target.value)} />
    //   <br />
    //   <label>Excel:</label>
    //   <br />
    //   <input
    //     type="file"
    //     onChange={async (e) => {
    //       if (e?.target?.files?.length) {
    //         const data = await readExcel(e.target.files?.[0] as File);
    //         excelRef.current = data;
    //       }
    //     }}
    //   />
    //   <br />
    //   <label>Image files:</label>
    //   <br />
    //   <input
    //     type="file"
    //     multiple
    //     onChange={(e) => {
    //       const files = Array.from(e.target.files || []);
    //       if (files.some((item) => !item.type.startsWith("image"))) return;
    //       imageFiles.current = files;
    //     }}
    //   />
    //   <br />
    //   <label>Audio files:</label>
    //   <br />
    //   <input
    //     type="file"
    //     multiple
    //     onChange={(e) => {
    //       const files = Array.from(e.target.files || []);
    //       if (files.some((item) => !item.type.startsWith("audio"))) return;
    //       audioFiles.current = files;
    //     }}
    //   />
    //   <button
    //     onClick={async () => {
    //       setIsLoading(true);
    //       await handleCreateExam(
    //         testName,
    //         excelRef.current,
    //         imageFiles.current,
    //         audioFiles.current
    //       );
    //       setIsLoading(false);
    //     }}
    //   >
    //     Tao
    //   </button>
    // </div>

    <>
      <TestCreateModal open={open} setOpen={setOpen} />
      <Button
        sx={{ marginBottom: 2 }}
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
      >
        Tạo bài thi
      </Button>
      <DataTable
        heads={["ID", "Tên", "Dạng bài", ""]}
        type="test"
        setOpen={setOpenEdit}
      />
    </>
  );
};

export default TestManagement;
