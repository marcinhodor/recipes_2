import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Recipe } from "../models/interfaces";

import React, { MouseEvent, ChangeEvent, useEffect, useState } from "react";
import Card from "../components/Card";

const Home: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedId, setClickedId] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const matchedItems = recipes.filter((item) =>
      item.title.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredRecipes(matchedItems);
  };

  const handleClick = (id: string) => {
    setClickedId(id);
  };

  const cancelCardClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setClickedId("");
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await fetch("/api/recipes");
      const receivedRecipes = await response.json();
      setRecipes(receivedRecipes);
      setFilteredRecipes(receivedRecipes);
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
        <section className="flex justify-center w-full gap-4 px-2 mt-4">
          <label className="relative block">
            {/* <span className="sr-only">Search</span> */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Image src="/icons8-search.svg" width={20} height={20} />
            </span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Image src="/icons8-search.svg" width={20} height={20} />
            </span>
            <input
              className="block w-full py-2 pl-8 pr-3 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1"
              placeholder="Filter..."
              type="text"
              name="search"
              // value={filterPhrase}
              onChange={handleSearch}
            />
          </label>
        </section>
        {/* CARDS */}
        <main className="flex flex-wrap justify-center w-full gap-2 px-2 pt-4 sm:gap-4">
          {filteredRecipes.map((recipe) => {
            return (
              <div key={recipe.id} onClick={() => handleClick(recipe.id)}>
                <Card
                  recipe={recipe}
                  clickedId={clickedId}
                  cancelCardClick={cancelCardClick}
                />
              </div>
            );
          })}
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
