import type { NextPage } from "next";
import Head from "next/head";
import AdminPage from "../../components/admin/AdminPage";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>olaQuiz - Admin</title>
      </Head>
      <AdminPage page="user" />
    </>
  );
};

export default Admin;
