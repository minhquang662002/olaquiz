import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Protected: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  useEffect(() => {
    if (session.status != "loading") {
      if (!router.pathname.startsWith("/admin")) {
        if (session.data?.user.roleId == 1 || session.data?.user.roleId == 2) {
          router.replace("/admin/user");
        } else {
          setIsAllowed(true);
        }
      }

      if (router.pathname.startsWith("/admin")) {
        if (
          session.data?.user?.roleId == 3 ||
          session.status == "unauthenticated"
        ) {
          router.replace("/");
        } else {
          setIsAllowed(true);
        }
      }
    }
  }, [router, session]);

  return isAllowed ? (
    <>
      {!router.pathname.startsWith("/admin") && <Navbar />}
      {children}
    </>
  ) : (
    <div></div>
  );
};

export default Protected;
