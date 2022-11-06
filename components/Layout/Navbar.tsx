import { FC, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";

const Navbar: FC = () => {
  const authCtx = useContext(AuthContext);
  const miscCtx = useContext(MiscContext);

  const router = useRouter();
  // console.log();

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
      {router.pathname !== "/login" && (
        <div className="flex justify-end">
          <span className="flex items-center">Hello {authCtx.name}!</span>
          {!authCtx.isLoggedIn ? (
            <Link href="/login">
              <button className="p-2 mx-4 text-gray-800 bg-transparent border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700">
                Sign in
              </button>
            </Link>
          ) : (
            <button
              onClick={authCtx.logout}
              className="p-2 mx-4 text-red-800 bg-transparent border border-red-300 rounded hover:bg-red-100 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
