import React, { MouseEvent, useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";

import type { NextPage } from "next";
import { Recipe } from "../models/interfaces";

import Card from "../components/Card";
import Spinner from "../components/Spinner";

const Home: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [clickedId, setClickedId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) &&
        (chosenTags.length !== 0
          ? chosenTags.some((r) => recipe.tags.includes(r))
          : true)
    );
  }, [recipes, query, chosenTags]);

  const tagsList = useMemo(() => {
    const tags = [];
    for (let recipe of recipes) {
      for (let tag of recipe.tags) {
        tags.push(tag);
      }
    }
    return [...new Set(tags)].sort();
  }, [recipes]);

  const handleCardClick = (id: string) => {
    setClickedId(id);
  };

  const cancelCardClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setClickedId("");
  };

  const handleChipClick = (tag: string) => {
    const tagIndex = chosenTags.indexOf(tag);
    if (tagIndex === -1) {
      setChosenTags((prev) => [...prev, tag].sort());
    } else {
      setChosenTags((prev) =>
        prev.filter((_, index) => index !== tagIndex).sort()
      );
    }
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await fetch("/api/recipes");
      const receivedRecipes = await response.json();
      setRecipes(receivedRecipes);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen pt-4">
      <Head>
        <title>Recipes</title>
      </Head>

      <div className="flex flex-col">
        {/* HEADER */}
        <header className="flex flex-col items-center w-full text-center">
          <h1 className="text-4xl font-bold text-blue-600">Recipes</h1>
        </header>

        {/* SEARCH */}
        {isLoading ? null : (
          <section className="flex justify-center w-full gap-4 px-2 mt-4">
            <div className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Image src="/icons8-search.svg" width={20} height={20} />
              </span>
              {query.length > 0 ? (
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Image
                    className="cursor-pointer"
                    onClick={() => setQuery("")}
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </section>
        )}

        <main>
          {/* Chips */}
          <div className="flex mx-2 mt-4 space-x-2 overflow-auto overflow-x-scroll lg:justify-center whitespace-nowrap">
            {tagsList.map((tag) => {
              return (
                <span
                  onClick={() => handleChipClick(tag)}
                  key={tag}
                  className={
                    "px-4 py-2 text-sm font-semibold transition duration-300 rounded-full cursor-pointer align-center ease min-w-max" +
                    (chosenTags.includes(tag)
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
          <div className="flex flex-wrap justify-center gap-2 px-2 pt-4 xl:gap-4">
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
                      clickedId={clickedId}
                      cancelCardClick={cancelCardClick}
                    />
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="flex justify-center w-full h-12 mt-4 text-sm border-t">
        <a
          className="flex items-center justify-center gap-2 hover:text-blue-600"
          href="https://github.com/marcinhodor/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Marcin Hodor
        </a>
      </footer>
    </div>
  );
};

export default Home;
