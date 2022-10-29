import { Result, User } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { prisma } from "../../utils/db";
import { FC } from "react";
import { Container, Box, Avatar, Typography } from "@mui/material";

interface Props {
  user: User;
  results: Result[];
}

const AccountPage: FC<Props> = ({ user, results }) => {
  return (
    <>
      <Head>Account</Head>
      <Container
        sx={{ background: "white", marginY: 5, padding: 2, display: "flex" }}
        maxWidth="lg"
      >
        <Box sx={{ textAlign: "center" }}>
          <Avatar sx={{ marginX: "auto" }} src={`${user?.avatar}`} />
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box>
          <Typography>Test results</Typography>
        </Box>
      </Container>
    </>
  );
};

export default AccountPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const userId = ctx.params?.userId as string;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatar: true,
      email: true,
    },
  });
  const results = await prisma.result.findMany({
    where: {
      userId,
    },
  });
  return {
    props: {
      user,
      results,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
