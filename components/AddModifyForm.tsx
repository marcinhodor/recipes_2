import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, FormEvent, useContext, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";

import RecipesContext from "../context/recipes-context";

const AddModifyForm: FC = () => {
  const recipesCtx = useContext(RecipesContext);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({
      titleError: false,
      linkError: false,
      tagsError: false,
    });
    const titleError = titleRef.current?.value === "";
    const linkError = linkRef.current?.value === "";
    const tagsError = selectedTags.length === 0;

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
    try {
      const res = await fetch("/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current?.value,
          link: linkRef.current?.value,
          tags: selectedTags,
        }),
      });
      // console.log(res);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block max-w-sm p-4 m-auto bg-white rounded-lg shadow-lg md:p-6 md:mt-6">
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
            ref={titleRef}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none"
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
            ref={linkRef}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
            onChange={(tags) => {
              setSelectedTags(tags.map((tag) => tag.value));
            }}
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
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Save
          </button>
          <Link href="..">
            <button className="px-6 py-2.5 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddModifyForm;
