import { useState, useEffect, FC } from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "./DataTable";
import PostCreateModal from "./post/PostCreateModal";
import TopicCreateModal from "./vocabulary/TopicCreateModal";
import TestCreateModal from "./test/TestCreateModal";
import PracticeTopicCreateModal from "./practice/PracticeTopicCreateModal";
import PracticeExerciseCreateModal from "./practice/PracticeExerciseCreateModal";
import PostEditModal from "./post/PostEditModal";

interface Props {
  page: string;
  type?: string;
}

const AdminDataManagement: FC<Props> = ({ page, type }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
  let edit_modal;
  let create_modal;
  let heads;
  let title;
  if (page == "post") {
    create_modal = <PostCreateModal open={open} setOpen={setOpen} />;
    heads = ["ID", "Tiêu đề", "Danh mục", ""];
    title = "bài viết";
    edit_modal = (
      <PostEditModal open={!!openEdit} setOpen={setOpenEdit} itemId={itemId} />
    );
  } else if (page == "vocabulary") {
    create_modal = <TopicCreateModal open={open} setOpen={setOpen} />;
    heads = ["ID", "Chủ đề", ""];
    title = "từ vựng";
  } else if (page == "test") {
    create_modal = <TestCreateModal open={open} setOpen={setOpen} />;
    heads = ["ID", "Tên", "Dạng bài", ""];
    title = "bài thi";
  } else if (page == "user") {
    heads = ["ID", "Tên", "Email", "Vai trò", ""];
    title = "người dùng";
  } else if (page == "practice") {
    if (type == "topic") {
      heads = ["ID", "Tên", "Loại", ""];
      title = "chủ đề luyện tập";
      create_modal = <PracticeTopicCreateModal open={open} setOpen={setOpen} />;
    } else {
      heads = ["ID", "Tên", "Chủ đề", ""];
      title = "bài luyện tập";
      create_modal = (
        <PracticeExerciseCreateModal open={open} setOpen={setOpen} />
      );
    }
  }

  useEffect(() => {
    return () => {
      setOpen(false);
      setOpenEdit(false);
    };
  }, [page]);

  return (
    <>
      {open && create_modal}
      {openEdit && edit_modal}
      <Typography variant="h5" sx={{ fontWeight: "600", marginBottom: 2 }}>
        Quản lý {title}
      </Typography>
      {page != "user" && (
        <Button
          sx={{ marginBottom: 2 }}
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
          Tạo {title}
        </Button>
      )}
      <DataTable
        heads={heads as string[]}
        page={page}
        type={type}
        setOpen={setOpenEdit}
        itemId={itemId}
        setItemId={setItemId}
      />
    </>
  );
};

export default AdminDataManagement;
