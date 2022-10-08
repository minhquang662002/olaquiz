import type { NextPage } from "next";
import Head from "next/head";
import AdminPage from "../../components/admin/AdminPage";
import { ITopic } from "../../utils/types";
interface Props {
  topics: ITopic[];
}

const vocabulary: NextPage<Props> = ({ topics }) => {
  return (
    <>
      <Head>
        <title>Quản lý từ vựng</title>
      </Head>
      <AdminPage page="vocabulary" topics={topics} />
    </>
  );
};

export default vocabulary;
