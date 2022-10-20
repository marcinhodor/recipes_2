import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="border-4 border-blue-600 border-solid rounded-full w-14 h-14 border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Spinner;
