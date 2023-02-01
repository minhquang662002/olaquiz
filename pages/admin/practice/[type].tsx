import { NextPage, GetServerSideProps } from "next";
import { useMemo } from "react";
import Head from "next/head";
import AdminDataManagement from "../../../components/admin/AdminDataManagement";
import { Box } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import AdminDrawer from "../../../components/admin/AdminDrawer";

const Admin: NextPage<{ type: string }> = ({ type }) => {
  const CONTENT = <AdminDataManagement page="practice" type={type} />;
  const TITLE = useMemo(() => {
    if (type == "topic") {
      return "chủ đề luyện tập";
    } else if (type == "exercise") {
      return "bài luyện tập";
    }
  }, [type]);

  return (
    <>
      <Head>
        <title>{`Quản lý ${TITLE}`}</title>
      </Head>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <AdminDrawer />
        <div style={{ width: "80%" }}>
          <Navbar />

          <div style={{ padding: 20 }}>{CONTENT}</div>
        </div>
      </Box>
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { type } = ctx.query;

  if (type != "topic" && type != "exercise") {
    return {
      redirect: {
        destination: "/admin/user",
        permanent: false,
      },
    };
  }

  return {
    props: {
      type,
    },
  };
};
