import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import NavCenter from "./NavCenter";
import NavLeft from "./NavLeft";

const Navbar: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <ToastContainer />
      <AppBar position="static" sx={{ background: "white" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
              color: "black",
            }}
          >
            <Typography
              component="a"
              href="/"
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "monospace" }}
            >
              olaQuiz
            </Typography>
            {!router.pathname.startsWith("/admin") && <NavCenter />}
            <NavLeft />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
