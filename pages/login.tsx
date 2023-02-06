import { Grid } from "@mui/material";
import Head from "next/head";
import LoginForm from "../components/auth/LoginForm";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    if (session.user.roleId == 1 || session.user.roleId == 2) {
      return {
        redirect: {
          destination: "/admin/user",
          permanent: false,
        },
      };
    } else if (session.user.roleId == 3) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
