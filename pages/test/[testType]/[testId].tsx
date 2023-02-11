import { NextPage } from "next";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import Leaderboard from "../../../components/test/left/Leaderboard";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { TimerContextProvider } from "../../../components/context/TimerContext";
import loading from "../../../asset/loading.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import { TestContextProvider } from "../../../components/context/TestContext";

const TestDisplayRight = dynamic(
  import("../../../components/test/right/TestDisplayRight")
);

const QuestionPalette = dynamic(
  import("../../../components/test/left/QuestionPalette"),
  { ssr: false }
);

const SwipeableEdgeDrawer = dynamic(
  import("../../../components/test/SwipeableEdgeDrawer"),
  { ssr: false }
);

const Test: NextPage = () => {
  const router = useRouter();
  const { data, isFetching } = useQuery({
    queryKey: ["testData", router.query.testId],
    queryFn: async () => {
      const res = await axios.get(`/api/test/${router.query.testId}`);
      return res;
    },
    refetchOnWindowFocus: false,
    enabled: !!router.query.testId,
  });

  return (
    <>
      <Head>
        <title>Bài thi</title>
      </Head>

      <TestContextProvider
        questions={data?.data?.questions}
        result={data?.data?.result}
      >
        <TimerContextProvider result={data?.data?.result}>
          <Container maxWidth="lg" sx={{ display: "flex", gap: 2, marginY: 2 }}>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                  flexShrink: 0,
                },
              }}
              width="30%"
            >
              {isFetching ? (
                <Box
                  style={{
                    background: "white",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Image src={loading} alt="loading" priority />
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      background: "white",
                      display: "inline-block",
                      padding: 1,
                    }}
                  >
                    <Typography>{data?.data?.name}</Typography>
                  </Box>
                  <QuestionPalette type="test" />
                  <Leaderboard ranking={data?.data?.ranking || []} />
                </>
              )}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              {isFetching ? (
                <Box
                  sx={{ flexGrow: 1, background: "white", textAlign: "center" }}
                >
                  <Image src={loading} alt="loading" priority />
                </Box>
              ) : (
                <TestDisplayRight />
              )}
            </Box>
          </Container>
          <SwipeableEdgeDrawer />
        </TimerContextProvider>
      </TestContextProvider>
    </>
  );
};

export default Test;
