import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Protected from "../components/auth/Protected";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Protected>
        <Component {...pageProps} />
      </Protected>
    </SessionProvider>
  );
}

export default MyApp;
