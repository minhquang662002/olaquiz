import type { NextPage } from "next";
import Head from "next/head";
import { prisma } from "../../utils/db";
import { ICategory } from "../../utils/types";
import AdminPage from "../../components/admin/AdminPage";

interface Props {
  categories: ICategory[];
}

const Admin: NextPage<Props> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>olaQuiz - Admin</title>
      </Head>
      <AdminPage page="post" props={categories} />
    </>
  );
};

export default Admin;

export async function getStaticProps() {
  const res = await prisma.category.findMany();
  return {
    props: {
      categories: res || null,
    }, // will be passed to the page component as props
  };
}
