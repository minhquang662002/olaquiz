import { NextPage, GetServerSideProps } from "next";
import { useMemo } from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import AdminDrawer from "../../components/admin/AdminDrawer";
import dynamic from "next/dynamic";
const AdminDataManagement = dynamic(
  import("../../components/admin/AdminDataManagement")
);
const Admin: NextPage<{ page: string }> = ({ page }) => {
  const TITLE = useMemo(() => {
    if (page == "user") {
      return "người dùng";
    } else if (page == "post") {
      return "bài viết";
    } else if (page == "vocabulary") {
      return "từ vựng";
    } else if (page == "practice") {
      return "bài luyện tập";
    } else if (page == "test") {
      return "bài thi";
    }
  }, [page]);
  return (
    <>
      <Head>
        <title>{`Quản lý ${TITLE}`}</title>
      </Head>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <AdminDrawer />
        <div style={{ width: "80%" }}>
          <Navbar />

          <div style={{ padding: 20 }}>
            <AdminDataManagement page={page} />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { page } = ctx.query;

  if (
    page != "user" &&
    page != "post" &&
    page != "practice" &&
    page != "test" &&
    page != "vocabulary"
  ) {
    return {
      redirect: {
        destination: "/admin/user",
        permanent: false,
      },
    };
  }

  return {
    props: {
      page,
    },
  };
};
