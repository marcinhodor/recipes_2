import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/auth-context";
import { RecipesContextProvider } from "../context/recipes-context";
import MiscContext from "../context/misc-context";

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("Guest");

  const [query, setQuery] = useState("");
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [clickedId, setClickedId] = useState("");

  const resetFilters = () => {
    setQuery("");
    setChosenTags([]);
    setClickedId("");
  };

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      <RecipesContextProvider>
        <MiscContext.Provider
          value={{
            query,
            setQuery,
            chosenTags,
            setChosenTags,
            clickedId,
            setClickedId,
            resetFilters,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MiscContext.Provider>
      </RecipesContextProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
