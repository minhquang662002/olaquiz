import { NextPage, GetServerSideProps } from "next";
import { prisma } from "../../../utils/db";
import Head from "next/head";
import type { Answer, Question, Result, User } from "@prisma/client";
import { Container, Typography } from "@mui/material";
import TestDisplayRight from "../../../components/test/right/TestDisplayRight";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { TestContextProvider } from "../../../components/context/TestContext";
import { TimerContextProvider } from "../../../components/context/TimerContext";
import QuestionPalette from "../../../components/test/left/QuestionPalette";
import Leaderboard from "../../../components/test/left/Leaderboard";
import { getSession } from "next-auth/react";

interface Props {
  questions: Question[];
  result: Result & { answer: Answer[] };
  ranking: (Result & User)[];
  testName: string;
}

const Test: NextPage<Props> = ({ questions, result, ranking, testName }) => {
  return (
    <>
      <Head>
        <title>Bài thi</title>
      </Head>
      <TestContextProvider result={result} questions={questions}>
        <TimerContextProvider result={result}>
          <Container maxWidth="lg" sx={{ display: "flex", gap: 2, marginY: 2 }}>
            <div>
              <Typography>{testName}</Typography>
              <QuestionPalette type="test" />
              <Leaderboard ranking={ranking} />
            </div>
            <TestDisplayRight />
          </Container>
        </TimerContextProvider>{" "}
      </TestContextProvider>
    </>
  );
};

export default Test;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=auth-to-test",
      },
    };
  }
  const testId = ctx.params?.testId as string;

  const questions = await prisma.question.findMany({
    where: {
      testId,
    },
    orderBy: {
      STT: "asc",
    },
  });

  if (!questions.length) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const testName = await prisma.test.findFirst({
    where: {
      id: testId,
    },
    select: {
      name: true,
    },
  });

  const result = await prisma.result.findFirst({
    where: {
      testId,
      userId: auth.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      answer: true,
    },
  });

  const ranking =
    await prisma.$queryRaw`select max("Result"."score") as score, "User"."avatar", "User"."firstName",
    "User"."lastName" from "Result"
   inner join "User" on "User".id = "Result"."userId"
   inner join "Test" on "Test".id = "Result"."testId"
   group by  "User"."avatar", "User"."firstName",
    "User"."lastName", "Result"."testId"
   having "Result"."testId" = ${testId} order by score desc limit 10`;

  return {
    props: {
      testName: testName?.name,
      questions,
      result: JSON.parse(JSON.stringify(result)),
      ranking,
    },
  };
};
