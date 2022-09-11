import type { NextPage } from "next";
import { Grid } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import Head from "next/head";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>olaQuiz - Register</title>
        <meta name="description" content="toeic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <RegisterForm />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
