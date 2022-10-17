import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { prisma } from "../../../utils/db";
import Head from "next/head";
import { Question } from "@prisma/client";
import { Container, Box, Typography } from "@mui/material";
import { useState } from "react";
import DisplayedQuestion from "../../../components/test/Question";
import TestProgress from "../../../components/test/LinearProgress";

interface Props {
  questions: Question[];
}

const Test: NextPage<Props> = ({ questions }) => {
  const qst = [
    {
      option_1: "A",
      audio: "co",
      image: "/co",
      paragraph: "test paragraph",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      question: "haha",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      question: "haha",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      audio: "test2",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
    },
    {
      audio: "test",
      question: "Day la cho de cau hoi",
      paragraph: "Day la doan van cua cau hoi",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
      group: 1,
    },
    {
      question: "dusogijorgjoweigjowegojiwegwe?",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
      group: 1,
    },
    {
      question: "dusogijorgjoweigjowegojiwegwewrwqwwq?",
      option_1: "A",
      option_2: "B",
      option_3: "C",
      option_4: "D",
      answer: "A",
      group: 1,
    },
  ];
  const [displayedNumber, setDisplayedNumber] = useState(11);
  const [answeredList, setAnsweredList] = useState(new Map());

  return (
    <>
      <Head>
        <title>Bài thi</title>
      </Head>
      <Container maxWidth="lg" sx={{ display: "flex", gap: 3, marginY: 2 }}>
        <Box
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            background: "white",
            alignSelf: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography>Question Palette</Typography>
            <div>123</div>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 30px)",
              gridTemplateRows: "repeat(3, 30px)",
              gap: 1,
            }}
          >
            {qst.map((item: any, index) => {
              return (
                <div
                  style={{
                    borderRadius: 3,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${
                      answeredList.get(index + 1) ? "#007AFF" : "#F2F3F7"
                    }`,
                    color: `${
                      answeredList.get(index + 1)
                        ? "white"
                        : index == displayedNumber
                        ? "black"
                        : "#7B7777"
                    }`,
                    fontWeight: "bold",
                    border: `${
                      index == displayedNumber ||
                      (qst[displayedNumber]?.group
                        ? item?.group == qst[displayedNumber]?.group
                        : false)
                        ? "2px solid #007AFF"
                        : ""
                    }`,
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => {
                    if (index != displayedNumber) {
                      setDisplayedNumber(index);
                    }
                  }}
                >
                  {index + 1}
                </div>
              );
            })}
          </Box>
          <TestProgress value={answeredList.size} total={qst.length} />

          <div
            style={{
              background: "gray",
              color: "black",
              borderRadius: 999,
              display: "block",
              fontWeight: 900,
              fontSize: 15,
              width: 80,
              padding: 2,
              textAlign: "center",
              marginLeft: "auto",
            }}
          >
            Submit
          </div>
        </Box>

        <Box
          sx={{
            background: "white",
            flexGrow: 1,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            borderRadius: 2,
            paddingX: 5,
            paddingY: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DisplayedQuestion
            question={
              qst[displayedNumber].group
                ? qst.reduce((prev: any, cur, index) => {
                    if (cur.group === qst[displayedNumber]?.group) {
                      prev.push({ ...cur, STT: index + 1 });
                    }
                    return prev;
                  }, [])
                : [{ ...qst[displayedNumber], STT: displayedNumber + 1 }]
            }
            setAnsweredList={setAnsweredList}
            answeredList={answeredList}
          />
        </Box>
      </Container>
    </>
  );
};

export default Test;

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const testId = ctx.params?.testId as string;
//   const questions = await prisma.question.findMany({
//     where: {
//       testId: testId,
//     },
//   });

//   return {
//     props: {
//       questions,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };
