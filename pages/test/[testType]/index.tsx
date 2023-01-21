import { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Typography,
  List,
  Box,
  Divider,
  ListItemButton,
} from "@mui/material";
import { Fragment } from "react";
import { prisma } from "../../../utils/db";
import { Test } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  tests: (Test & { result: string })[];
}

const TestTypePage: NextPage<Props> = ({ tests }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Thi thử</title>
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Start your TOEIC Online Mini Test Now!
        </Typography>
        <Typography>MINI TEST</Typography>
        <List sx={{ background: "white" }} disablePadding>
          {tests.map((item) => (
            <Fragment key={item.id}>
              <ListItemButton
                component="a"
                href={`/test/${router.query.testType}/${item.id}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
                <Box
                  sx={{
                    border: "1px solid #BACDFF",
                    background: "#E8EEFF",
                    width: 80,
                    textAlign: "center",
                    borderRadius: 1,
                    color: "#656EF1",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {item.result || 0} pts
                </Box>
              </ListItemButton>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Container>
    </>
  );
};

export default TestTypePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  const { testType } = ctx.query;

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=auth-to-test",
      },
    };
  }

  const tests =
    await prisma.$queryRaw`select *, (select "Result"."score" from "Result" 
    inner join "User" on "User".id = "Result"."userId" 
    inner join "Test" on "Test".id = "Result"."testId"
    where "Result"."userId" = ${session?.user?.id} and "Result"."testId" = p.id order by "Result"."createdAt" desc limit 1) as result from "Test" as p where p.type = ${testType}`;

  return {
    props: {
      tests,
    },
  };
};
