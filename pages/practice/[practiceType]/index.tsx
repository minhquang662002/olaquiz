import { GetServerSideProps } from "next";
import { prisma } from "../../../utils/db";
import { PracticeTopic } from "@prisma/client";
import { NextPage } from "next";
import { Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Link from "next/link";
import IntroTitle from "../../../components/IntroTitle";
import { useRouter } from "next/router";

interface Props {
  topics: PracticeTopic[];
}

const PracticeTypePage: NextPage<Props> = ({ topics }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Chủ đề luyện tập - olaQuiz</title>
      </Head>
      <IntroTitle
        content={`${
          router.query.practiceType == "grammar"
            ? "Luyện tập ngữ pháp"
            : "Luyện tập từ vựng"
        }`}
      />
      <Container
        maxWidth="lg"
        sx={{ background: "white", borderRadius: 2, padding: 2, marginY: 4 }}
      >
        <Grid container>
          {topics?.map((item) => (
            <Grid
              item
              key={item.id}
              md={3}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                "&:hover": {
                  color: "#725CF5",
                },
              }}
              onClick={() =>
                router.push(
                  `/practice/${item.type}/${item.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`
                )
              }
            >
              <LocalLibraryIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PracticeTypePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const practiceType = ctx.query?.practiceType as string;
  const topics = await prisma.practiceTopic.findMany({
    where: {
      type: practiceType,
    },
  });

  return {
    props: {
      topics,
    },
  };
};
