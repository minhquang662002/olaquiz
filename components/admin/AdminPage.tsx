import React, { FC } from "react";
import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import AdminDrawer from "./AdminDrawer";
import PostCreate from "./PostCreate";

interface Props {
  page: string;
  props?: any;
}

const AdminPage: FC<Props> = ({ page, props }) => {
  let content;
  if (page == "user") {
    content = <p>user</p>;
  } else if (page == "post") {
    content = <PostCreate categories={props} />;
  } else if (page == "vocabulary") {
  } else if (page == "category") {
    content = <p>haha</p>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AdminDrawer />
      <div style={{ width: "80%" }}>
        <Navbar />

        {content}
      </div>
    </Box>
  );
};

export default AdminPage;
