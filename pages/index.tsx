import type { NextPage } from "next";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import banner from "../asset/banner.jpg";
import Image from "next/image";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.error == "auth-to-test") {
      toast.error("You must login to do test!");
    }
  }, [router.query.error]);

  return (
    <>
      <Head>
        <title>Olaquiz - English for the better</title>
        <meta name="description" content="toeic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ position: "relative", height: 500, width: "100%" }}>
        <Image
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.6)",
          }}
          src={banner}
          alt="banner"
        />
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
            color: "white",
          }}
        >
          <Typography variant="h3" fontWeight="bolder">
            olaQuiz
          </Typography>
          <Typography>
            Chào mừng đến với <b>olaQuiz</b>, trang web TOEIC miễn phí cung cấp
            cho người dùng những thông tin, mẹo khi thi TOEIC cùng vô số bài thi
            thử cũng như các bài luyện tập về ngữ pháp và từ vựng.Còn chần chờ
            gì nữa mà không bắt đầu ngay hành trình chinh phục tấm TOEIC của
            ngay bây giờ!
          </Typography>
        </Container>
      </Box>
      <Container>
        <Typography
          variant="h4"
          fontWeight="bolder"
          textAlign="center"
          color="#34447C"
          sx={{ marginTop: 2 }}
        >
          Bắt đầu luyện tập TOEIC ngay bây giờ
        </Typography>
        <Typography textAlign="center" color="#8293D0">
          Muốn đặt được số điểm TOEIC bạn mong ước? Hãy thử ngay một vài bài
          luyện tập và thi thử trên trang web này để sẵn sàng 100% cho bài thi
          TOEIC tới!
        </Typography>
        <Box>
          <Typography variant="h4" fontWeight="bolder" color="#34447C">
            TOEIC Exam Simulator
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;
