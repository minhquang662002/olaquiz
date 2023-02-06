import { Grid } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import RegisterForm from "../components/auth/RegisterForm";
import { getSession } from "next-auth/react";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Đăng ký</title>
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

export default RegisterPage;

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
