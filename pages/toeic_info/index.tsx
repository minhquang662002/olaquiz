import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { prisma } from "../../utils/db";
import Head from "next/head";
import Link from "next/link";
import IntroTitle from "../../components/IntroTitle";
import { Post } from "@prisma/client";

const toeicinfo: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Giới thiệu về TOEIC</title>
      </Head>
      <IntroTitle content="Giới thiệu về TOEIC" />
      <Container maxWidth="lg" sx={{ marginTop: 8, paddingBottom: 4 }}>
        <Grid container spacing={2}>
          {posts.map((item) => (
            <Grid item key={item.id}>
              <Card
                sx={{
                  width: 276,
                  height: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ minHeight: 200 }}
                  src={item.image as string}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Link href={`/toeic_info/post?id=${item.id}`}>
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
                  <Link href={`/toeic_info/post?id=${item.id}`}>
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

export default toeicinfo;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    where: {
      category: "/toeic_info",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
