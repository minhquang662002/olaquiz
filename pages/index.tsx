import type { NextPage } from "next";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  useEffect(() => {
    if (router.query.error == "auth-to-test") {
      toast.error("You must login to do test!");
    }
  }, [router.query.error]);

  return (
    <>
      <Head>
        <title>Olaquiz - English for the better</title>
        <meta name="description" content="toeic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        sx={{
          position: "relative",
          backgroundImage:
            "url(https://res.cloudinary.com/dd0w757jk/image/upload/v1662304354/olaquiz/banner1_ymji60.jpg)",
          height: 500,
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ position: "absolute", top: "50%", left: "10%" }}>
          <Typography>English</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;
