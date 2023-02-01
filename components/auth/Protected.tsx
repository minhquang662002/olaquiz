import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../layout/Footer";

interface Props {
  children: React.ReactNode;
}

const Protected: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status != "loading") {
      if (!router.pathname.startsWith("/admin")) {
        if (session.data?.user.roleId == 1 || session.data?.user.roleId == 2) {
          router.replace("/admin/user");
        }
      }

      if (router.pathname.startsWith("/admin")) {
        if (
          session.data?.user?.roleId == 3 ||
          session.status == "unauthenticated"
        ) {
          router.replace("/");
        }
      }

      if (router.pathname.startsWith("/test")) {
        if (session.status == "unauthenticated") {
          router.replace("/?error=auth-to-test");
        }
      }
    }
  }, [router, session]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!router.pathname.startsWith("/admin") && <Navbar />}
      {children}

      {!new RegExp(/test\/.*\/.*/).test(router.pathname) && <Footer />}
    </div>
  );
};

export default Protected;
