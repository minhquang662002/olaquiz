import { GetServerSideProps, NextPage } from "next";
import { Container, Box, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { Exercise, Question } from "@prisma/client";
import QuestionPalette from "../../../../components/test/left/QuestionPalette";
import { TestContextProvider } from "../../../../components/context/TestContext";
import Link from "next/link";
import DisplayContainer from "../../../../components/exercise/DisplayContainer";
import { prisma } from "../../../../utils/db";

interface Props {
  exercises: Exercise[];
  initExercise: Exercise & { questions: Question[] };
}

const ExercisePage: NextPage<Props> = ({ exercises, initExercise }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Luyện tập</title>
      </Head>
      <TestContextProvider questions={initExercise?.questions || []}>
        <Container maxWidth="lg" sx={{ display: "flex", gap: 2, marginY: 2 }}>
          <Box sx={{ flexShrink: 0, width: "28%" }}>
            <QuestionPalette type="exercise" />
            <Box sx={{ flexGrow: 1 }}>
              <Grid sx={{ marginTop: 5, flexGrow: 1 }} container gap={2}>
                {exercises?.map((item: Exercise) => (
                  <Link
                    key={item.id}
                    href={`/practice/${router.query.practiceType}/${router.query.practiceTopic}/${item.id}`}
                    style={{ flexGrow: 1 }}
                  >
                    <Grid
                      sx={{
                        borderRadius: 2,
                        background:
                          initExercise.id == item.id ? "white" : "#E4E6ED",
                        whiteSpace: "nowrap",
                        border:
                          initExercise.id == item.id ? "2px solid #007AFF" : "",
                        cursor: "pointer",
                        color:
                          initExercise.id == item.id ? "#007AFF" : "#B2B6C3",
                        fontSize: 14,
                        fontWeight: "bolder",
                        textAlign: "center",
                        padding: "3px",
                        flexGrow: 1,
                      }}
                      item
                    >
                      {item.name}
                    </Grid>
                  </Link>
                ))}
              </Grid>
            </Box>
          </Box>
          <DisplayContainer />
        </Container>
      </TestContextProvider>
    </>
  );
};

export default ExercisePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const practiceType = ctx.query?.practiceType as string;
  if (practiceType != "grammar" && practiceType != "vocabulary") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const practiceTopic = ctx.query?.practiceTopic as string;
  const exercises = await prisma.exercise.findMany({
    where: {
      PracticeTopic: {
        name: {
          contains: practiceTopic.split("-").join(" "),
          mode: "insensitive",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (!exercises.length) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const initExercise = await prisma.exercise.findFirst({
    where: {
      id: exercises[0].id,
    },
    select: {
      id: true,
      name: true,
      questions: {
        orderBy: {
          STT: "asc",
        },
      },
    },
  });

  return {
    props: {
      exercises,
      initExercise,
    },
  };
};
