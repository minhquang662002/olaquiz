import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
} from "@mui/material";
import { GetStaticProps } from "next";
import { FC } from "react";
import { prisma } from "../utils/db";
import Head from "next/head";
import { IPost } from "../utils/types";

const toeicinfo: FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Giới thiệu về TOEIC</title>
      </Head>
      <Box
        sx={{
          background: "black",
          height: 200,
        }}
      ></Box>
      <Container maxWidth="lg" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          {posts.map((item) => (
            <Grid item key={item.id}>
              <Card
                sx={{ height: 500, display: "flex", flexDirection: "column" }}
              >
                <CardMedia component="img" height="200" src={item.image} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>{item.summary}</Typography>
                  <Link sx={{ marginTop: "auto" }} href="/unknown">
                    Read more :v
                  </Link>
                </CardContent>
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
      category: {
        url: "/toeic_info",
      },
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
