import React, { MouseEvent } from "react";

import { Recipe } from "../models/interfaces";

interface CardProps {
  recipe: Recipe;
  clickedId: string;
  cancelCardClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Card = ({ recipe, clickedId, cancelCardClick }: CardProps) => (
  <div className="flex flex-col justify-center h-32 px-6 text-left border hover:border-blue-600 w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
    {clickedId !== recipe.id ? (
      <>
        <h3 className="text-xl font-bold">{recipe.title}</h3>
        <div className="flex">
          {recipe.tags.map((tag) => (
            <p key={tag} className="mt-2 mr-2 text-gray-500 last:mr-0">
              #{tag}
            </p>
          ))}
        </div>
      </>
    ) : (
      <div className="flex place-content-around">
        <a href={recipe.link} target="_blank">
          <button className="w-32 px-2 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
            Go to URL
          </button>
        </a>
        <button
          className="w-32 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={(e) => cancelCardClick(e)}
        >
          Cancel
        </button>
      </div>
    )}
  </div>
);

export default Card;
