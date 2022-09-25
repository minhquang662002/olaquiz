import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button, Typography, Modal } from "@mui/material";
import AdminDrawer from "../../components/admin/AdminDrawer";
import { useState } from "react";
import { prisma } from "../../utils/db";
import { createCategory } from "../../utils/api";
import { CategoryType, Prisma } from "@prisma/client";

const Admin: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Prisma.CategoryCreateInput>({
    name: "",
    url: "",
    type: "" as CategoryType,
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 10,
  };

  return (
    <>
      <Head>
        <title>olaQuiz - Admin</title>
      </Head>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <h2>Create category</h2>
          <input
            type="text"
            value={category.name}
            onChange={(e) =>
              setCategory((state) => ({ ...state, name: e.target.value }))
            }
          />
          <input
            type="url"
            value={category.url}
            onChange={(e) =>
              setCategory((state) => ({ ...state, url: e.target.value }))
            }
          />
          <select
            value={category.type}
            onChange={(e) => {
              setCategory((state) => ({
                ...state,
                type: e.target.value as CategoryType,
              }));
            }}
          >
            <option value="POST">POST</option>
            <option value="VOCABULARY">VOCABULARY</option>
          </select>
          <Button
            onClick={() => {
              createCategory(category);
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <AdminDrawer />

        <div style={{ width: "80%" }}>
          <Box>
            <Typography variant="h6">Manage category</Typography>
            <Button variant="outlined" onClick={handleOpen}>
              Create category
            </Button>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Admin;

export async function getStaticProps() {
  const res = await prisma.category.findMany();
  return {
    props: {
      data: res || null,
    }, // will be passed to the page component as props
  };
}
