import { MouseEvent, useEffect, useState, useMemo, useContext } from "react";
import Head from "next/head";
import Image from "next/image";

import RecipesContext from "../context/recipes-context";
import MiscContext from "../context/misc-context";

import type { NextPage } from "next";

import Card from "../components/Card";
import Spinner from "../components/Spinner";

const Home: NextPage = () => {
  const recipesCtx = useContext(RecipesContext);
  const miscCtx = useContext(MiscContext);

  const [isLoading, setIsLoading] = useState(true);

  const filteredRecipes = useMemo(() => {
    return recipesCtx.recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(miscCtx.query.toLowerCase()) &&
        (miscCtx.chosenTags.length !== 0
          ? miscCtx.chosenTags.some((r) => recipe.tags.includes(r))
          : true)
    );
  }, [recipesCtx.recipes, miscCtx.query, miscCtx.chosenTags]);

  const tagsList = useMemo(() => {
    const tags = [];
    for (let recipe of recipesCtx.recipes) {
      for (let tag of recipe.tags) {
        tags.push(tag);
      }
    }
    return [...new Set(tags)].sort();
  }, [recipesCtx.recipes]);

  const handleCardClick = (id: string) => {
    miscCtx.setClickedId(id);
  };

  const cancelCardClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    miscCtx.setClickedId("");
  };

  const handleChipClick = (tag: string) => {
    const tagIndex = miscCtx.chosenTags.indexOf(tag);
    if (tagIndex === -1) {
      miscCtx.setChosenTags((prev: string[]) => [...prev, tag].sort());
    } else {
      miscCtx.setChosenTags((prev: string[]) =>
        prev.filter((_, index) => index !== tagIndex).sort()
      );
    }
  };

  // Fetch recipes
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await fetch("/api/recipes");
      const receivedRecipes = await response.json();
      recipesCtx.setRecipes(receivedRecipes);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="flex flex-col">
        {/* SEARCH */}
        {isLoading ? null : (
          <section className="flex justify-center w-full gap-4 px-2 mt-2 md:mt-4">
            <div className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Image src="/icons8-search.svg" width={20} height={20} />
              </span>
              {miscCtx.query.length > 0 ? (
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Image
                    className="cursor-pointer"
                    onClick={() => miscCtx.setQuery("")}
                    src="/cancel-close-10373.svg"
                    width={20}
                    height={20}
                  />
                </span>
              ) : null}
              <input
                className="block w-full py-2 pl-8 pr-8 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1"
                placeholder="Filter..."
                type="text"
                name="search"
                value={miscCtx.query}
                onChange={(e) => miscCtx.setQuery(e.target.value)}
              />
            </div>
          </section>
        )}

        <div>
          {/* Chips */}
          <div className="flex mx-2 mt-2 space-x-2 overflow-x-auto md:mt-4 lg:justify-center whitespace-nowrap">
            {tagsList.map((tag) => {
              return (
                <span
                  onClick={() => handleChipClick(tag)}
                  key={tag}
                  className={
                    "px-4 py-2 text-sm font-semibold transition duration-300 rounded-full cursor-pointer align-center ease min-w-max outline-0 ring-0 focus:outline-none focus:ring-0" +
                    (miscCtx.chosenTags.includes(tag)
                      ? " text-white bg-blue-600 hover:bg-blue-700"
                      : " text-gray-500 bg-gray-200 hover:bg-gray-300")
                  }
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* CARDS */}
          <div className="flex flex-wrap justify-center gap-2 px-2 pt-2 md:pt-4 xl:gap-4">
            {isLoading ? (
              <Spinner />
            ) : (
              filteredRecipes.map((recipe) => {
                return (
                  <div
                    key={recipe.id}
                    onClick={() => handleCardClick(recipe.id)}
                    className={"flex-auto w-80 max-w-sm"}
                  >
                    <Card
                      recipe={recipe}
                      clickedId={miscCtx.clickedId}
                      cancelCardClick={cancelCardClick}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
