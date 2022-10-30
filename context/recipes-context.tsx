import React, { useState } from "react";

import { Recipe } from "../models/interfaces";

type RecipeContext = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipesContext = React.createContext<RecipeContext>({
  recipes: [],
  setRecipes: () => null,
});

type Props = {
  children: React.ReactNode;
};

export const RecipesContextProvider: React.FC<Props> = (props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const contextValue = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={contextValue}>
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
