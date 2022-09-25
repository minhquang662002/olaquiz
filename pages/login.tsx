import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "../components/auth/LoginForm";
import { useState, useEffect } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const LoginPage: NextPage = () => {
  const [isHavingAccount, setIsHavingAccount] = useState<boolean>(true);
  const title = `olaQuiz - ${isHavingAccount ? "Login" : "Register"}`;
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      Router.replace("/");
    }
  }, [session.status]);

  return (
    <>
      <Head>
        <title>{title}</title>
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
          {isHavingAccount ? (
            <LoginForm setIsHavingAccount={setIsHavingAccount} />
          ) : (
            <RegisterForm setIsHavingAccount={setIsHavingAccount} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;

export const getServerSideProps = async (context: any) => {
  const auth = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};
