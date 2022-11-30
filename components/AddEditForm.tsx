import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, FormEvent, useContext, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

import RecipesContext from "../context/recipes-context";

const AddModifyForm: FC<{ recipeId?: string }> = ({ recipeId }) => {
  const recipesCtx = useContext(RecipesContext);

  const editedRecipe = recipesCtx.recipes.filter(
    (recipe) => recipe.id === recipeId
  )[0];

  const [title, setTitle] = useState(editedRecipe ? editedRecipe.title : "");
  const [link, setLink] = useState(editedRecipe ? editedRecipe.link : "");
  const [tags, setTags] = useState<string[]>(
    editedRecipe ? editedRecipe.tags : []
  );

  useEffect(() => console.log(tags), [tags]);

  const [errors, setErrors] = useState({
    titleError: false,
    linkError: false,
    tagsError: false,
  });

  const router = useRouter();
  // console.log(router.pathname);

  const tagsSelectOptions = () =>
    recipesCtx.tagsList.map((option: string) => {
      return { value: option, label: option };
    });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({
      titleError: false,
      linkError: false,
      tagsError: false,
    });
    const titleError = title.length === 0;
    const linkError = link.length === 0;
    const tagsError = tags.length === 0;

    if (titleError || linkError || tagsError) {
      if (titleError) {
        setErrors((prevErrors) => {
          return { ...prevErrors, titleError };
        });
      }
      if (linkError) {
        setErrors((prevErrors) => {
          return { ...prevErrors, linkError };
        });
      }
      if (tagsError) {
        setErrors((prevErrors) => {
          return { ...prevErrors, tagsError };
        });
      }
      return;
    }

    let APIurl: string;
    let APImethod: string;

    if (router.pathname.includes("/add")) {
      APIurl = "/api/new";
      APImethod = "POST";
    } else {
      APIurl = "/api/edit";
      APImethod = "PUT";
    }

    try {
      const res = await fetch(APIurl, {
        method: APImethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recipeId,
          title,
          link,
          tags,
        }),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block max-w-sm p-4 m-auto bg-white rounded-md shadow-lg md:p-6 md:mt-6">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="mb-4 md:mb-6 form-group">
          <label
            htmlFor="InputTitle"
            className="inline-block mb-2 text-gray-800 form-label"
          >
            Title
          </label>
          <input
            id="InputTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-400 rounded-md transition ease-in-out m-0 focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter title"
          />
          {errors.titleError && (
            <small className="block mt-1 text-xs text-red-600">
              Title can't be empty.
            </small>
          )}
        </div>

        <div className="mb-4 md:mb-6 form-group">
          <label
            htmlFor="InputLink"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Link
          </label>
          <input
            id="InputLink"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-400 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter Link"
          />
          {errors.linkError && (
            <small className="block mt-1 text-xs text-red-600">
              Link can't be empty.
            </small>
          )}
        </div>
        <div className="mb-4 md:mb-6 form-group">
          <label
            htmlFor="InputLink"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Tags
          </label>
          <CreatableSelect
            isMulti
            options={tagsSelectOptions()}
            value={tags.map((tag) => {
              return { label: tag, value: tag };
            })}
            onChange={(tags) =>
              tags.map((tag) => {
                setTags((prev) => [...new Set([...prev, tag.value])]);
              })
            }
          />
          {errors.tagsError && (
            <small className="block mt-1 text-xs text-red-600">
              Choose at least one tag.
            </small>
          )}
        </div>
        <div className="flex justify-around">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Save
          </button>
          <Link href="..">
            <button className="px-6 py-2.5 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddModifyForm;