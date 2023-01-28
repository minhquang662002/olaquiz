import {
  Container,
  Grid,
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

const ToeicTips: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Mẹo thi TOEIC</title>
      </Head>

      <IntroTitle content="Mẹo thi TOEIC" />
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
                <CardMedia component="img" src={item.image as string} />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Link href={`/toeic_tips/post?id=${item.id}`}>
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
                  <Link href={`/toeic_tips/post?id=${item.id}`}>
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

export default ToeicTips;

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
    revalidate: 3600,
  };
};
