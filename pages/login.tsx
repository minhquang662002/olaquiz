import { Grid } from "@mui/material";
import Head from "next/head";
import LoginForm from "../components/auth/LoginForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginPage = () => {
  const session = useSession();
  useEffect(() => {
    if (session.status == "authenticated") {
      if (session.data.user.roleId == 1 || session.data.user.roleId == 2) {
        window.location.replace("/admin/user");
      } else if (session.data.user.roleId == 3) {
        window.location.replace("/");
      }
    }
  }, [session]);

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
