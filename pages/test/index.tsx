import { NextPage, GetServerSideProps } from "next";
import { Container, Typography, Box, Button } from "@mui/material";
import full from "../../asset/full-test.webp";
import mini from "../../asset/mini-test.webp";
import Image from "next/image";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

interface Props {
  tests: any;
}

const index: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Thi thử</title>
      </Head>
      <Container maxWidth="lg" sx={{ marginY: 2 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}
        >
          Start your TOEIC Online Test Now!
        </Typography>
        <Box sx={{ display: "flex", gap: 2, color: "white" }}>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
            }}
          >
            <Image src={mini} alt="mini_test_img" />
            <div style={{ position: "absolute", top: 20, left: 20 }}>
              <Typography variant="h5" fontWeight="bolder">
                MINI TEST
              </Typography>
              <Typography sx={{ maxWidth: 300 }}>
                Taking mini test with the number of questions and time limit
                reduced by half
              </Typography>
            </div>
            <Button
              variant="contained"
              href="/test/mini-test"
              sx={{ position: "absolute", right: 20, bottom: 20 }}
            >
              Start
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
            }}
          >
            <Image src={full} alt="full_test_img" />
            <div style={{ position: "absolute", top: 20, left: 20 }}>
              <Typography variant="h5" fontWeight="bolder">
                FULL TEST
              </Typography>
              <Typography sx={{ maxWidth: 300 }}>
                Taking full test with the same number of questions and time
                limit as the actual test
              </Typography>
            </div>
            <Button
              variant="contained"
              href="/test/full-test"
              sx={{ position: "absolute", right: 20, bottom: 20 }}
            >
              Start
            </Button>
          </Box>
        </Box>
        <div>
          <p>
            Taking the TOEIC online exam is one of the best ways to get
            acquainted with the test format as well as evaluate your current
            level. From there, you can set up an appropriate test preparation
            plan to get a high score.{" "}
          </p>
          <h2>1. Who should take the TOEIC online exam?</h2>
          <p>
            Anyone who is going to sit for the TOEIC exam should take the TOEIC
            online exam. Taking the test helps to verify your current level of
            English-language proficiency, from which, you can draw up suitable
            learning strategies.
          </p>
          <p>
            Besides, those who just want to test their general English level can
            also take the TOEIC online exam.{" "}
          </p>
          <h2>2. What are benefits of TOEIC online test?</h2>
          <p>The TOEIC online exam brings a host of advantages for learners.</p>
          <h3>2.1. Help to improve English competence </h3>
          <p>
            After finishing each online TOEIC test, you will certainly learn
            something from it, such as obtaining good vocabulary, structures or
            collocations. Also, you can identify your strengths, weaknesses and
            avoid the same mistakes in the next practice test and real test.
            Your English level will surely be improved every single day.{" "}
          </p>
          <h3>2.2. Practicing under time pressure</h3>
          <p>
            Time management is extremely important in any exam. It may be an
            indirect factor affecting your marks. Therefore, it is essential to
            take the online test at home under time pressure if you want to gain
            a high score in the TOEIC exam. By doing that, you can know how much
            time you should spend for each part.{" "}
          </p>
          <h3>2.3. Various kinds of questions</h3>
          <p>
            Most of the TOEIC online exams provide learners with a variety of
            tasks and questions from easy to difficult. You can choose questions
            that are appropriate to your level. Tests are carefully compiled by
            experts as well as follow exactly the same format as the real test.{" "}
          </p>
          <h3>2.4. Convenience</h3>
          <p>
            One of the perfect advantages of the TOEIC online exam is
            convenience. You just need to stay at home or anywhere you like, use
            a smartphone, computer or any technological device connected with
            the Internet, you can take the TOEIC exam. You can save the time to
            travel to the TOEIC center.{" "}
          </p>
          <h3>
            3. Why should you choose TOEIC online exam of TOEIC TEST PRO?{" "}
          </h3>
          <p>
            Among a great number of websites and apps to study TOEIC, why is the
            TOEIC TEST PRO preferred by many learners? Let’s take a look at the
            following reasons. First of all, online tests on TOEIC TEST PRO are
            divided into Full tests and Mini tests appropriate to the need of
            each person. Full tests are taken in 120 minutes which is like in
            the actual test. Meanwhile, mini tests are taken in 60 minutes with
            the quantity of questions reduced by half. Secondly, questions are
            carefully written by expert tutors which cover all sections of a
            TOEIC exam such as Listening and Reading. Furthermore, questions are
            continuously updated according to the new format including topics
            below: - Part 1: Photos - Part 2: Questions and Responses - Part 3:
            Conversations - Part 4: Talks - Part 5: Incomplete sentences - Part
            6: Text Completions - Part 7: Single Passages - Part 7: Double
            Passages - Part 7: Triple Passages Thirdly, each question gives an
            answer with a clear explanation. Test takers can learn vocabulary,
            structures as well as collocations provided in the explanations.
            Finally, TOEIC TEST PRO is scientifically and carefully designed to
            create an eye-catching and easy-to-use interface. TOEIC TEST PRO
            guarantees to bring users with the best learning experience.
            Download TOEIC TEST PRO right now to enjoy great contents and superb
            features.{" "}
          </p>
        </div>
      </Container>
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/?error=auth-to-test",
      },
    };
  }
  return {
    props: {},
  };
};
