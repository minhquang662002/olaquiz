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
          <Box sx={{ width: "28%" }}>
            <QuestionPalette type="exercise" />
            <Grid sx={{ marginTop: 5 }} container gap={2}>
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
                        router.query.exercise == item.id ? "white" : "#E4E6ED",
                      whiteSpace: "nowrap",
                      border:
                        router.query.exercise == item.id
                          ? "2px solid #007AFF"
                          : "",
                      cursor: "pointer",
                      color:
                        router.query.exercise == item.id
                          ? "#007AFF"
                          : "#B2B6C3",
                      fontSize: 14,
                      fontWeight: "bolder",
                      textAlign: "center",
                      padding: "3px",
                      flexGrow: 1,
                    }}
                    item
                  >
                    {item.name.split("-").join(" ")}
                  </Grid>
                </Link>
              ))}
            </Grid>
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

  const exercise = ctx.query?.exercise as string;
  const initExercise = await prisma.exercise.findFirst({
    where: {
      id: exercise,
    },
    select: {
      questions: {
        orderBy: {
          STT: "asc",
        },
      },
      id: true,
      name: true,
    },
  });

  return {
    props: {
      exercises,
      initExercise,
    },
  };
};
