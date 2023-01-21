import { NextPage } from "next";
import Image from "next/image";
import grammar_img from "../../asset/practice_grammar.webp";
import vocab_img from "../../asset/practice_vocab.webp";
import { Container, Typography, Box, Button } from "@mui/material";
import IntroTitle from "../../components/IntroTitle";
import Head from "next/head";

const PracticePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Luyện tập - olaQuiz</title>
      </Head>
      <IntroTitle content="Luyện tập" />
      <Container maxWidth="lg" sx={{ marginY: 5 }}>
        <Box sx={{ display: "flex", gap: 2, color: "white" }}>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
            }}
          >
            <Image src={vocab_img} alt="vocab_img_practice" />
            <Box style={{ position: "absolute", top: 20, left: 20 }}>
              <Typography variant="h5" fontWeight="bolder">
                TỪ VỰNG
              </Typography>
              <Typography sx={{ maxWidth: 300 }}>
                Bài luyện tập từ vựng được chia thành nhiều chủ đề và nhiều phần
                sẽ giúp bạn mở rộng kho từ vựng của mình
              </Typography>
            </Box>
            <Button
              variant="contained"
              href="/practice/vocabulary"
              sx={{
                position: "absolute",
                right: 20,
                bottom: 20,
                background: "#636cf5",
              }}
            >
              Bắt đầu
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
            }}
          >
            <Image src={grammar_img} alt="grammar_practice_img" />
            <div style={{ position: "absolute", top: 20, left: 20 }}>
              <Typography variant="h5" fontWeight="bolder">
                NGỮ PHÁP
              </Typography>
              <Typography sx={{ maxWidth: 300 }}>
                Các bài tập ngữ pháp với hơn 30 chủ đề sẽ giúp bạn tăng cường
                nền tảng Tiếng Anh của bản thân
              </Typography>
            </div>
            <Button
              variant="contained"
              href="/practice/grammar"
              sx={{
                position: "absolute",
                right: 20,
                bottom: 20,
                background: "#636cf5",
              }}
            >
              Bắt đầu
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PracticePage;
