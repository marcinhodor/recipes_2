import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { AuthContextProvider } from "../context/auth-context";
import { RecipesContextProvider } from "../context/recipes-context";
import { MiscContextProvider } from "../context/misc-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RecipesContextProvider>
        <MiscContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MiscContextProvider>
      </RecipesContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
