import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout username="dummy">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
