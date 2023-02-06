import { Container, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  const links = [
    {
      title: "Trang chủ",
      link: "/",
    },
    {
      title: "Luyện tập",
      link: "/practice",
    },
    {
      title: "Thi thử",
      link: "/test",
    },
    {
      title: "Giới thiệu",
      link: "/about-us",
    },
    {
      title: "Liên hệ",
      link: "/contact",
    },
    {
      title: "Điều khoản",
      link: "/terms",
    },
    {
      title: "Quyền riêng tư",
      link: "/privacy",
    },
  ];

  return (
    <div style={{ marginTop: "auto" }}>
      <div
        style={{
          background: "#E7ECF9",
        }}
      >
        <Container
          sx={{
            display: {
              xs: "flex",
            },
            justifyContent: "space-between",
            padding: 3,
            alignItems: "center",
            color: "#34447C",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                md: 32,
                xs: 24,
              },
            }}
            fontWeight="bolder"
            color="black"
          >
            olaQuiz
          </Typography>
          <div>
            {links.slice(0, 3).map((item) => (
              <Link key={item.title} href={`${item.link}`}>
                <Typography
                  sx={{
                    fontSize: {
                      md: 24,
                      xs: 18,
                    },
                  }}
                  fontWeight="bolder"
                >
                  {item.title}
                </Typography>
              </Link>
            ))}
          </div>
          <div>
            {links.slice(3).map((item) => (
              <Link key={item.title} href={`${item.link}`}>
                <Typography
                  sx={{
                    fontSize: {
                      md: 24,
                      xs: 18,
                    },
                  }}
                  fontWeight="bolder"
                >
                  {item.title}
                </Typography>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <div
        style={{
          background: "#103557",

          color: "#D5D3C8",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: {
              md: "space-between",
            },
            alignItems: {
              xs: "center",
            },
            padding: 2,
            flexDirection: {
              md: "row",
              xs: "column",
            },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              width: {
                md: "60%",
                xs: "90%",
              },
            }}
          >
            TOEIC is a registered trademark of Educational Testing Service
            (ETS). This web is not affiliated with or endorsed by Educational
            Testing Service.
          </Typography>
          <div>
            <Typography>Connect with us</Typography>
            <div>123</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
