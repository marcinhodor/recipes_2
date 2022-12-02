import React, { FC, useContext } from "react";

import Button from "./Button";

import { Recipe } from "../models/interfaces";
import MiscContext from "../context/misc-context";
import AuthContext from "../context/auth-context";
import RecipesContext from "../context/recipes-context";
import { useRouter } from "next/router";

interface CardProps {
  recipe: Recipe;
}

const Card: FC<CardProps> = ({ recipe }: CardProps) => {
  const miscCtx = useContext(MiscContext);
  const authCtx = useContext(AuthContext);
  const recipeCtx = useContext(RecipesContext);

  const router = useRouter();

  const handleEditClick = (url: string) => {
    if (!authCtx.isLoggedIn) {
      miscCtx.setShowNotifyModal({
        show: true,
        variant: "warning",
        text: "Only signed in users can modify recipes.",
      });
      return;
    }
    router.push(url);
  };

  const handleDeleteClick = (id: string) => {
    if (!authCtx.isLoggedIn) {
      miscCtx.setShowNotifyModal({
        show: true,
        variant: "warning",
        text: "Only signed in users can delete recipes.",
      });
      return;
    }
    recipeCtx.setRecipeIdToDelete(id);
    miscCtx.setShowDeleteModal(true);
  };

  return (
    <div className="p-2 border border-gray-200 rounded-md shadow-sm md:p-4">
      <h3 className="text-lg font-bold">{recipe.title}</h3>
      <div className="flex gap-2 md:pb-2">
        {recipe.tags.map((tag) => (
          <p key={tag} className="text-gray-500">
            #{tag}
          </p>
        ))}
      </div>
      <div className="flex justify-around mt-1">
        <a href={recipe.link} target="_blank" rel="noopener noreferrer">
          <Button variant="blue">Link</Button>
        </a>
        <div onClick={() => handleEditClick(`/edit/${recipe.id}`)}>
          <Button variant="gray">Edit</Button>
        </div>
        <div onClick={() => handleDeleteClick(recipe.id)}>
          <Button variant="red">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
