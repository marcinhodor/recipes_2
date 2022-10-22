import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/auth-context";
import RecipesContext from "../context/recipes-context";
import MiscContext from "../context/misc-context";

import { Recipe } from "../models/interfaces";

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState("Guest");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
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
      </RecipesContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
