import { useState } from "react";
import { Button } from "@mui/material";
import TopicCreateModal from "./TopicCreateModal";
import TopicEditModal from "./TopicEditModal";
import DataTable from "../DataTable";
import { FC } from "react";

const TopicManagement: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  return (
    <>
      <TopicCreateModal open={open} setOpen={setOpen} />
      <TopicEditModal open={openEdit} setOpen={setOpenEdit} />
      <Button
        sx={{ marginBottom: 2 }}
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
      >
        Tạo chủ đề
      </Button>
      <DataTable
        heads={["ID", "Chủ đề", ""]}
        type="topic"
        setOpen={setOpenEdit}
      />
    </>
  );
};

export default TopicManagement;
