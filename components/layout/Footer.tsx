import { Container, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <div style={{ marginTop: "auto" }}>
      <div
        style={{
          background: "#E7ECF9",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
            alignItems: "center",
            color: "#34447C",
          }}
        >
          <Typography variant="h4" fontWeight="bolder" color="black">
            olaQuiz
          </Typography>
          <div>
            <Link href="/">
              <Typography variant="h5" fontWeight="bolder">
                Home
              </Typography>
            </Link>
            <Link href="/practice">
              <Typography variant="h5" fontWeight="bolder">
                Practice
              </Typography>
            </Link>
            <Link href="/test">
              <Typography variant="h5" fontWeight="bolder">
                Test
              </Typography>
            </Link>
          </div>
          <div>
            <Typography variant="h5" fontWeight="bolder">
              About us
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              Contact
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              Terms
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              Privacy
            </Typography>
          </div>
        </Container>
      </div>

      <div
        style={{
          display: "flex",
          background: "#103557",
          justifyContent: "space-between",
          color: "#D5D3C8",
        }}
      >
        <Container
          sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
        >
          <Typography width="60%">
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
