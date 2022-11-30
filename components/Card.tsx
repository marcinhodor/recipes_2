import Link from "next/link";
import React, { FC, useContext } from "react";

import Button from "./Layout/Button";

import { Recipe } from "../models/interfaces";
import MiscContext from "../context/misc-context";

interface CardProps {
  recipe: Recipe;
}

const Card: FC<CardProps> = ({ recipe }: CardProps) => {
  const miscCtx = useContext(MiscContext);

  return (
    <div className="p-2 border border-gray-200 rounded-md shadow-sm">
      <h3 className="text-lg font-bold">{recipe.title}</h3>
      <div className="flex gap-2">
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
        <Link href={`/edit/${recipe.id}`}>
          <div>
            <Button variant="gray">Edit</Button>
          </div>
        </Link>
        <div onClick={() => miscCtx.setShowDeleteModal(true)}>
          <Button variant="red">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
