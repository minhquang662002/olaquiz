import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { prisma } from "../../utils/db";
import { IPost } from "../../utils/types";
import AdminPage from "../../components/admin/AdminPage";

interface Props {
  posts: IPost[];
}

const Admin: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Quản lý bài viết</title>
      </Head>
      <AdminPage page="post" posts={posts} />
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query?.page) || 1;
  const posts = await prisma.post.findMany({
    skip: page * 5,
    take: 5,
  });
  return {
    props: {
      posts,
    }, // will be passed to the page component as props
  };
};
