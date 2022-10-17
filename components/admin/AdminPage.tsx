import React, { FC } from "react";
import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import AdminDrawer from "./AdminDrawer";
import DataTable from "./DataTable";
import { IPost, ITopic, IUser } from "../../utils/types";
import PostManagement from "./post/PostManagement";
import TopicManagement from "./vocabulary/TopicManagement";
import ExamManagement from "./exam/ExamManagement";

interface Props {
  page: string;
  users?: IUser[];
  posts?: IPost[];
}

const AdminPage: FC<Props> = ({ page, posts }) => {
  let content;
  if (page == "user") {
    content = (
      <DataTable
        heads={["ID", "Tên", "Họ", "Email", "Vai trò", ""]}
        type="user"
      />
    );
  } else if (page == "post") {
    content = <PostManagement posts={posts as IPost[]} />;
  } else if (page == "vocabulary") {
    content = <TopicManagement />;
  } else if (page == "exam") {
    content = <ExamManagement />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AdminDrawer />
      <div style={{ width: "80%" }}>
        <Navbar />

        <div style={{ padding: 20 }}>{content}</div>
      </div>
    </Box>
  );
};

export default AdminPage;
