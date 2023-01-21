import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Protected from "../components/auth/Protected";
import { GlobalContextProvider } from "../components/context/GlobalContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Poppins",
        "Roboto",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <ThemeProvider theme={theme}>
            <Protected>
              <Component {...pageProps} />
            </Protected>
          </ThemeProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
