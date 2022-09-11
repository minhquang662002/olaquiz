import type { NextPage } from "next";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";

const Home: NextPage = () => {
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
