import { FC, useContext } from "react";
import Link from "next/link";

import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";

const Navbar: FC = () => {
  const authCtx = useContext(AuthContext);
  const miscCtx = useContext(MiscContext);

  return (
    <nav className="z-30 flex justify-between w-full py-2 bg-white border-b-2 border-blue-600 shadow">
      <Link href="/">
        <h1
          onClick={() => miscCtx.resetFilters()}
          className="ml-4 text-3xl font-bold text-blue-600 cursor-pointer"
        >
          Recipes
        </h1>
      </Link>
      <div className="flex justify-end">
        <span className="flex items-center">Hello {authCtx.username}!</span>
        <button className="p-2 mx-4 text-gray-800 bg-transparent border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
