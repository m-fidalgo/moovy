import "../ui/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import { Provider as StoreProvider } from "react-redux";
import { store } from "../data/stores/store";
import theme from "../ui/themes/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Moovy</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <StoreProvider store={store as any}>
          <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
