import { useState, FC } from "react";
import { Typography, Button } from "@mui/material";
import { IPost } from "../../../utils/types";
import AddIcon from "@mui/icons-material/Add";
import PostCreateModal from "./PostCreateModal";
import DataTable from "../DataTable";

interface Props {
  posts: IPost[];
}

const PostManagement: FC<Props> = ({ posts }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <PostCreateModal open={open} setOpen={setOpen} />
      <Typography variant="h5" sx={{ fontWeight: "600", marginBottom: 2 }}>
        Quản lý bài viết
      </Typography>
      <Button
        sx={{ marginBottom: 2 }}
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
        Tạo bài viết
      </Button>
      <DataTable
        heads={["ID", "Email", "First Name", "Last Name", "Role"]}
        data={posts}
        type="post"
      />
    </>
  );
};

export default PostManagement;
