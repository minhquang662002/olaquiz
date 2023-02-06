import "../styles/globals.css";
import { useRouter } from "next/router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/layout/Footer";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GlobalContextProvider } from "../components/context/GlobalContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
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
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                {!router.pathname.startsWith("/admin") && <Navbar />}
                <Component {...pageProps} />
                {!new RegExp(/test\/.*\/.*/).test(router.pathname) && (
                  <Footer />
                )}
              </div>
            </LocalizationProvider>
          </ThemeProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
