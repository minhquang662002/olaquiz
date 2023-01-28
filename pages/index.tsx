import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button, Container, Typography } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import banner from "../asset/banner.jpg";
import Image from "next/image";
import full from "../asset/full-test.webp";
import mini from "../asset/mini-test.webp";
import grammar_img from "../asset/practice_grammar.webp";
import vocab_img from "../asset/practice_vocab.webp";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.error == "auth-to-test") {
      toast.error("You must login to do test!");
    }
  }, [router.query.error]);

  const btnStyle = {
    position: "absolute",
    right: 20,
    bottom: 20,
    background: "#636cf5",
  };

  const imageStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    objectFit: "cover",
    borderRadius: "10px",
  };

  return (
    <>
      <Head>
        <title>olaQuiz - English For The Better</title>
        <meta name="description" content="toeic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          position: "relative",
          height: {
            md: 500,
            xs: 400,
          },
          width: "100%",
        }}
      >
        <Image
          sizes="100%"
          priority
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.6)",
          }}
          src={banner}
          alt="banner"
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ textShadow: "1px 1px 2px black", fontWeight: "bolder" }}
          >
            olaQuiz
          </Typography>
          <Typography
            sx={{
              fontWeight: "bolder",
              textShadow: "1px 1px 2px black",
              fontSize: { lg: 18 },
              width: {
                lg: 600,
                xs: 300,
              },
            }}
          >
            Chào mừng đến với <b>olaQuiz</b>, trang web TOEIC miễn phí cung cấp
            cho người dùng những thông tin, mẹo khi thi TOEIC cùng vô số bài thi
            thử cũng như các bài luyện tập về ngữ pháp và từ vựng.Còn chần chờ
            gì nữa mà không bắt đầu ngay hành trình chinh phục tấm TOEIC của
            ngay bây giờ!
          </Typography>
        </Box>
      </Box>
      <Container>
        <Typography
          variant="h4"
          fontWeight="bolder"
          textAlign="center"
          color="#34447C"
          sx={{ marginY: 5 }}
        >
          Bắt đầu luyện tập TOEIC ngay bây giờ
        </Typography>
        <Typography
          sx={{
            fontWeight: "bolder",
            textAlign: "center",
            color: "#8293D0",
            marginBottom: 2,
          }}
        >
          Muốn đặt được số điểm TOEIC bạn mong ước? Hãy thử ngay một vài bài
          luyện tập và thi thử trên trang web này để sẵn sàng 100% cho bài thi
          TOEIC tới!
        </Typography>
        <Box>
          <Typography variant="h4" fontWeight="bolder" color="#34447C">
            Thi thử TOEIC
          </Typography>
          <Box sx={{ display: "flex", gap: 2, color: "white", marginY: 3 }}>
            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
              }}
            >
              <Image
                src={mini}
                alt="mini_test_img"
                fill={true}
                style={imageStyle}
                sizes="100%"
              />
              <div style={{ position: "absolute", top: 20, left: 20 }}>
                <Typography variant="h5" fontWeight="bolder">
                  BÀI THI NHỎ
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 300,
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  Làm bài kiểm tra với số lượng câu hỏi và thời gian bằng một
                  nửa bài kiểm tra thực tế
                </Typography>
              </div>
              <Button variant="contained" href="/test/mini-test" sx={btnStyle}>
                Bắt đầu
              </Button>
            </Box>
            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                height: 200,
              }}
            >
              <Image
                src={full}
                alt="full_test_img"
                fill={true}
                style={imageStyle}
                sizes="100%"
              />
              <div style={{ position: "absolute", top: 20, left: 20 }}>
                <Typography variant="h5" fontWeight="bolder">
                  BÀI THI ĐẦY ĐỦ
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 300,
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  Làm đầy đủ bài thi với cùng số lượng câu hỏi và thời gian so
                  với thực tế
                </Typography>
              </div>
              <Button variant="contained" href="/test/full-test" sx={btnStyle}>
                Bắt đầu
              </Button>
            </Box>
          </Box>
        </Box>

        <Typography variant="h4" fontWeight="bolder" color="#34447C">
          Luyện tập
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            color: "white",
            marginY: 3,
            height: 200,
          }}
        >
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
            }}
          >
            <Image
              src={vocab_img}
              alt="vocab_img_practice"
              fill={true}
              style={imageStyle}
              sizes="100%"
            />
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
              }}
            >
              <Typography variant="h5" fontWeight="bolder">
                TỪ VỰNG
              </Typography>
              <Typography
                sx={{
                  maxWidth: 300,
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                Bài luyện tập từ vựng được chia thành nhiều chủ đề và nhiều phần
                sẽ giúp bạn mở rộng kho từ vựng của mình
              </Typography>
            </Box>
            <Button
              variant="contained"
              href="/practice/vocabulary"
              sx={btnStyle}
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
            <Image
              src={grammar_img}
              alt="grammar_practice_img"
              fill={true}
              style={imageStyle}
              sizes="100%"
            />
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
              }}
            >
              <Typography variant="h5" fontWeight="bolder">
                TỪ VỰNG
              </Typography>
              <Typography
                sx={{
                  maxWidth: 300,
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                Các bài tập ngữ pháp với hơn 30 chủ đề sẽ giúp bạn tăng cường
                nền tảng Tiếng Anh của bản thân
              </Typography>
            </Box>
            <Button variant="contained" href="/practice/grammar" sx={btnStyle}>
              Bắt đầu
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
