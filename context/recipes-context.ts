import React from "react";

import { Recipe } from "../models/interfaces";

const RecipesContext = React.createContext({
  recipes: <Recipe[]>[],
  setRecipes: (recipes: Recipe[]) => {},
});

export default RecipesContext;
