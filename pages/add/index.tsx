import React from "react";
import type { NextPage } from "next";

const Add: NextPage = () => {
  //
  return (
    <div className="flex flex-col items-center justify-center mt-3">
      {/* Title */}
      <div className="">
        <label htmlFor="title" className="mr-2 text-gray-700 form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="title"
        />
      </div>

      {/* Link */}
      <div className="">
        <label htmlFor="link" className="mr-2 text-gray-700 form-label">
          Link
        </label>
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="link"
        />
      </div>
      {/* Link */}
      {/* Tags */}
    </div>
  );
};

export default Add;
