import Head from "next/head";
import IntroTitle from "../../components/IntroTitle";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { prisma } from "../../utils/db";
import { GetStaticProps, NextPage } from "next";
import { Post } from "@prisma/client";
const GrammarPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Ngữ pháp - olaQuiz</title>
      </Head>
      <IntroTitle content="Ngữ pháp" />
      <Container maxWidth="lg" sx={{ marginTop: 5, paddingBottom: 10 }}>
        <Grid container spacing={2}>
          {posts.map((item) => (
            <Grid md={3} item key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  src={item.image as string}
                  sx={{ minHeight: 200 }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Link href={`/grammar/post?id=${item.id}`}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        marginTop: "auto",
                        "&:hover": {
                          color: "#1976D2",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                  <Typography sx={{ fontSize: 12 }}>{item.summary}</Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/grammar/post?id=${item.id}`}>
                    <Typography
                      sx={{
                        marginTop: "auto",
                        marginLeft: 1,
                        fontSize: 13,
                        color: "#1976D2",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Đọc bài này
                    </Typography>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default GrammarPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    where: {
      category: "/grammar",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
