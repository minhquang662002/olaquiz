import { NextPage } from "next";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import QuestionPalette from "../../../components/test/left/QuestionPalette";
import Leaderboard from "../../../components/test/left/Leaderboard";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { TimerContextProvider } from "../../../components/context/TimerContext";
import loading from "../../../asset/loading.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  TestContext,
  TestContextProvider,
} from "../../../components/context/TestContext";
import { useContext } from "react";

const TestDisplayRight = dynamic(
  import("../../../components/test/right/TestDisplayRight")
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
  });

  const { isSubmitted } = useContext(TestContext);
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
            <div>
              {isFetching ? (
                <Box
                  style={{
                    background: "white",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Image src={loading} alt="loading" />
                </Box>
              ) : (
                <Box>
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
                </Box>
              )}
              <Leaderboard ranking={data?.data?.raking || []} />
            </div>

            <Box sx={{ flexGrow: 1 }}>
              {isFetching ? (
                <Box
                  sx={{ flexGrow: 1, background: "white", textAlign: "center" }}
                >
                  <Image src={loading} alt="loading" />
                </Box>
              ) : (
                <TestDisplayRight />
              )}
            </Box>
          </Container>
        </TimerContextProvider>
      </TestContextProvider>
    </>
  );
};

export default Test;
