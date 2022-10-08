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
import { IPost } from "../../utils/types";
import Link from "next/link";

const toeicinfo: NextPage<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Mẹo thi TOEIC</title>
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
                sx={{
                  width: 300,
                  height: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia component="img" src={item.image as string} />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>{item.summary}</Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/toeic_info/post?id=${item.id}`}>
                    <Typography sx={{ marginTop: "auto" }}>
                      Read more
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
      category: "/toeic_tips",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
