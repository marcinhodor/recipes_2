import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { AuthContextProvider } from "../context/auth-context";
import { RecipesContextProvider } from "../context/recipes-context";
import { MiscContextProvider } from "../context/misc-context";
// import ProtectRoute from "../components/HOC/ProtectRoute";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RecipesContextProvider>
        <MiscContextProvider>
          {/* <ProtectRoute> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </ProtectRoute> */}
        </MiscContextProvider>
      </RecipesContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
