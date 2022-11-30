import { FC, useContext } from "react";
import MiscContext from "../context/misc-context";

const NoAccessModal: FC = () => {
  const miscCtx = useContext(MiscContext);

  return (
    <div className="fixed z-10 w-full h-16 text-white bg-red-500">
      <div className="flex flex-col items-center justify-center h-full text-sm">
        <p>Only Admins can add or modify recipes.</p>
        <button
          onClick={() => miscCtx.setShowNoAccessModal(false)}
          className="w-20 p-1 mt-1 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default NoAccessModal;
