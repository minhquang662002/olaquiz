import { prisma } from "../../utils/db";
import { GetServerSideProps, NextPage } from "next";
import { Container, Box } from "@mui/system";
import Head from "next/head";
import { Post } from "@prisma/client";
import IntroTitle from "../../components/IntroTitle";
interface Props {
  post: Post;
}

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <IntroTitle content={`${post.title}`} />
      <Box>
        <Container maxWidth="lg">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;
  const post = await prisma.post.findFirst({ where: { id: id as string } });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
