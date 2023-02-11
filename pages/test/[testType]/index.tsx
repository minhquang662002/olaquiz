import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
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
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

interface Props {
  tests: (Test & { result: string })[];
  testType: string;
}

const TestTypePage: NextPage<Props> = ({ tests, testType }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Thi thử</title>
      </Head>
      <Container maxWidth="lg" sx={{ marginBottom: 10 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          marginY={2}
        >
          Bắt đầu {testType == "mini-test" ? "bài thi nhỏ" : "bài thi đầy đủ"}{" "}
          ngay bây giờ!
        </Typography>
        <Typography fontWeight="bold" sx={{ marginY: 2 }}>
          BÀI THI {testType == "mini-test" ? "BÀI THI NHỎ" : "BÀI THI ĐẦY ĐỦ"}
        </Typography>
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
                  transition: "0.4s",
                  "&:hover": {
                    boxShadow: "0 4px 6px #e8eaf1",
                  },
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
  const session = await getSession(ctx);
  const { testType } = ctx.query;

  const tests =
    await prisma.$queryRaw`select *, (select "Result"."score" from "Result" 
    inner join "User" on "User".id = "Result"."userId" 
    inner join "Test" on "Test".id = "Result"."testId"
    where "Result"."userId" = ${session?.user?.id} and "Result"."testId" = p.id order by "Result"."createdAt" desc limit 1) as result from "Test" as p where p.type = ${testType}`;

  return {
    props: {
      tests,
      testType,
    },
  };
};
