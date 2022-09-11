import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "../components/LoginForm";
const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>olaQuiz - Login</title>
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
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
