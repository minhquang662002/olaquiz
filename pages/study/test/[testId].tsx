import { NextPage, GetServerSideProps } from "next";
import { prisma } from "../../../utils/db";
import Head from "next/head";
import type { Answer, Question, Result } from "@prisma/client";
import { Container } from "@mui/material";
import { useState, useMemo } from "react";
import TestResult from "../../../components/test/TestResult";
import QuestionPalette from "../../../components/test/QuestionPalette";
import TestDisplayRight from "../../../components/test/TestDisplayRight";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
interface Props {
  questions: Question[];
  result: Result & { answer: Answer[] };
}

const Test: NextPage<Props> = ({ questions, result }) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [answeredList, setAnsweredList] = useState(
    !result
      ? new Map()
      : new Map(result?.answer?.map((item) => [item.number, item.answer]))
  );
  const [isSubmitted, setIsSubmitted] = useState(result ? true : false);
  const [start, setStart] = useState(false);
  const RESULT = useMemo(
    () =>
      Array.from(answeredList.keys()).reduce((prev: number, cur: any) => {
        prev += answeredList.get(cur) === questions[cur - 1].answer ? 5 : 0;
        return prev;
      }, 0),
    [questions, answeredList]
  );

  return (
    <>
      <Head>
        <title>Bài thi</title>
      </Head>
      <Container maxWidth="lg" sx={{ display: "flex", gap: 2, marginY: 2 }}>
        <QuestionPalette
          questions={questions}
          answeredList={answeredList}
          displayedNumber={displayedNumber}
          start={start}
          isSubmitted={isSubmitted}
          setDisplayedNumber={setDisplayedNumber}
          setIsSubmitted={setIsSubmitted}
          result={RESULT}
        />

        {isSubmitted ? (
          <TestResult
            questions={questions}
            answeredList={answeredList}
            result={RESULT || result.score}
            setIsSubmitted={setIsSubmitted}
            setAnsweredList={setAnsweredList}
          />
        ) : (
          <TestDisplayRight
            questions={questions}
            answeredList={answeredList}
            displayedNumber={displayedNumber}
            start={start}
            isSubmitted={isSubmitted}
            setDisplayedNumber={setDisplayedNumber}
            setStart={setStart}
            setIsSubmitted={setIsSubmitted}
            setAnsweredList={setAnsweredList}
          />
        )}
      </Container>
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

  if (!questions.length) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      questions,
      result: JSON.parse(JSON.stringify(result)),
    },
  };
};
