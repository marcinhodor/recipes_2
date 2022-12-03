import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, FormEvent, useContext, useState } from "react";
import CreatableSelect from "react-select/creatable";
import MiscContext from "../context/misc-context";

import isURL from "validator/lib/isURL";

import RecipesContext from "../context/recipes-context";

const AddModifyForm: FC<{ recipeId?: string }> = ({ recipeId }) => {
  const recipesCtx = useContext(RecipesContext);
  const miscCtx = useContext(MiscContext);

  const editedRecipe = recipesCtx.recipes.filter(
    (recipe) => recipe.id === recipeId
  )[0];

  const [title, setTitle] = useState(editedRecipe ? editedRecipe.title : "");
  const [link, setLink] = useState(editedRecipe ? editedRecipe.link : "");
  const [tags, setTags] = useState<string[]>(
    editedRecipe ? editedRecipe.tags : []
  );

  const [errors, setErrors] = useState({
    titleError: false,
    linkError: false,
    tagsError: false,
  });

  const router = useRouter();

  const tagsSelectOptions = () =>
    recipesCtx.tagsList.map((option: string) => {
      return { value: option, label: option };
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({
      titleError: false,
      linkError: false,
      tagsError: false,
    });
    const titleError = title.length === 0;
    const linkError = link.length === 0 || !isURL(link);
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
    let successText: string;
    let warningText: string;

    if (router.pathname.includes("/add")) {
      APIurl = "/api/new";
      APImethod = "POST";
      successText = "Recipe added successfully.";
      warningText = "There was an error while adding a recipe.";
    } else {
      APIurl = "/api/edit";
      APImethod = "PUT";
      successText = "Recipe edited successfully.";
      warningText = "Something went wrong while editing the recipe.";
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
      miscCtx.setShowNotifyModal({
        show: true,
        variant: "success",
        text: successText,
      });
      router.push("/");
    } catch (error) {
      miscCtx.setShowNotifyModal({
        show: true,
        variant: "warning",
        text: warningText,
      });
      console.log(error);
    }
  };

  const onChangeSelect = (tags: {}) => {
    let tagsList: string[] = [];
    (tags as { value: string; label: string }[]).map((tag) =>
      tagsList.push(tag.value)
    );
    setTags(tagsList);
  };

  return (
    <div className="block max-w-sm p-4 m-auto bg-white rounded-md shadow md:p-6 md:mt-6">
      <form onSubmit={(e) => handleSubmit(e)}>
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
              Empty or invalid URL.
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
            value={tags.map((tag) => {
              return { label: tag, value: tag };
            })}
            options={tagsSelectOptions()}
            onChange={(tags) => onChangeSelect(tags)}
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
            className="w-24 py-2 text-xs font-medium leading-tight text-blue-400 uppercase transition duration-150 ease-in-out border-2 border-blue-400 rounded-md hover:bg-black hover:bg-opacity-5"
          >
            Save
          </button>
          <Link href="..">
            <button className="w-24 py-2 text-xs font-medium leading-tight text-gray-400 uppercase transition duration-150 ease-in-out border-2 border-gray-400 rounded-md hover:bg-black hover:bg-opacity-5">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddModifyForm;
