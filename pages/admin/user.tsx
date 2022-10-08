import type { NextPage } from "next";
import Head from "next/head";
import AdminPage from "../../components/admin/AdminPage";
import { IUser } from "../../utils/types";

interface Props {
  users: IUser[];
}

const Admin: NextPage<Props> = ({ users }) => {
  return (
    <>
      <Head>
        <title>olaQuiz - User management</title>
      </Head>
      <AdminPage page="user" users={users} />
    </>
  );
};

export default Admin;
