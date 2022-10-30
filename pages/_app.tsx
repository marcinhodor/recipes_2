import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/auth-context";
import { RecipesContextProvider } from "../context/recipes-context";
import { MiscContextProvider } from "../context/misc-context";

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("Guest");

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      <RecipesContextProvider>
        <MiscContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MiscContextProvider>
      </RecipesContextProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
