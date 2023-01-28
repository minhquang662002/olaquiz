import { prisma } from "../../utils/db";
import { GetServerSideProps, NextPage } from "next";
import { Container, Box } from "@mui/system";
import Head from "next/head";
import { Post } from "@prisma/client";
import IntroTitle from "../../components/IntroTitle";
import { Divider, Typography } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <IntroTitle content={`${post.title}`} />

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          gap: 2,
          paddingBottom: 5,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            flexBasis: "40%",
            flexGrow: 1,
            overflowX: "hidden",
          }}
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        <Box
          sx={{
            background: "white",
            flexBasis: 1,
            flexGrow: 1,
            padding: "10px",
            alignSelf: "self-start",
          }}
        >
          <Typography variant="h6" fontWeight="bolder" color="#1976D2">
            Bài viết liên quan
          </Typography>
          {relatedPosts?.map((item) => (
            <Fragment key={item.id}>
              <Link href={`/toeic_info/post?id=${item.id}`}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      fontWeight: "bold",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
              <Divider sx={{ marginY: 1 }} />
            </Fragment>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;
  const post = await prisma.post.findFirst({ where: { id: id as string } });
  const relatedPosts = await prisma.post.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: id as string,
          },
        },
        { category: "/grammar" },
      ],
    },
    take: 10,
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      relatedPosts: JSON.parse(JSON.stringify(relatedPosts)),
    },
  };
};
