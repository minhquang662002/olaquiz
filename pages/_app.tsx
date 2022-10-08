import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Protected from "../components/auth/Protected";
import { GlobalContextProvider } from "../components/context/GlobalContext";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <Protected>
            <Component {...pageProps} />
          </Protected>
        </GlobalContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
