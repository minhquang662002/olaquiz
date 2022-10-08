import React, { FC } from "react";
import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import AdminDrawer from "./AdminDrawer";
import DataTable from "./DataTable";
import { IPost, ITopic, IUser } from "../../utils/types";
import PostManagement from "./post/PostManagement";
import TopicManagement from "./vocabulary/TopicManagement";

interface Props {
  page: string;
  users?: IUser[];
  posts?: IPost[];
  topics?: ITopic[];
}

const AdminPage: FC<Props> = ({ page, posts, topics }) => {
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
    content = <TopicManagement topics={topics as ITopic[]} />;
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
