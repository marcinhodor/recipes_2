import React, { FC } from "react";

const AddModifyForm: FC = () => {
  return (
    <div className="block max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <form>
        <div className="mb-6 form-group">
          <label
            htmlFor="InputTitle"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Title
          </label>
          <input
            id="InputTitle"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter title"
          />
          <small className="block mt-1 text-xs text-red-600">
            Title can't be empty.
          </small>
        </div>

        <div className="mb-6 form-group">
          <label
            htmlFor="InputLink"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Link
          </label>
          <input
            id="InputLink"
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter Link"
          />
          <small className="block mt-1 text-xs text-red-600">
            Link can't be empty.
          </small>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddModifyForm;
