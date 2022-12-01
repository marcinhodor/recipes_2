import React, { useState, useMemo } from "react";

import { Recipe } from "../models/interfaces";

type RecipeContext = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  tagsList: string[];
  recipeIdToDelete: string;
  setRecipeIdToDelete: React.Dispatch<React.SetStateAction<string>>;
};

const RecipesContext = React.createContext<RecipeContext>({
  recipes: [],
  setRecipes: () => null,
  tagsList: [],
  recipeIdToDelete: "",
  setRecipeIdToDelete: () => null,
});

type Props = {
  children: React.ReactNode;
};

export const RecipesContextProvider: React.FC<Props> = (props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeIdToDelete, setRecipeIdToDelete] = useState("");

  const tagsList = useMemo(() => {
    const tags = [];
    for (let recipe of recipes) {
      for (let tag of recipe.tags) {
        tags.push(tag);
      }
    }
    return [...new Set(tags)].sort();
  }, [recipes]);

  const contextValue = {
    recipes,
    setRecipes,
    tagsList,
    recipeIdToDelete,
    setRecipeIdToDelete,
  };

  return (
    <RecipesContext.Provider value={contextValue}>
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
