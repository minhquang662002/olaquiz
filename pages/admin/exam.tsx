import { NextPage } from "next";
import Head from "next/head";
import AdminPage from "../../components/admin/AdminPage";
const exam: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quản lý bài thi</title>
      </Head>
      <AdminPage page="exam" />
    </>
  );
};

export default exam;
