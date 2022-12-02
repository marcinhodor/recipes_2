import { FC, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";
import NotifyModal from "../NotifyModal";

const Navbar: FC = () => {
  const authCtx = useContext(AuthContext);
  const miscCtx = useContext(MiscContext);

  const router = useRouter();

  return (
    <>
      {miscCtx.showNotifyModal.show && (
        <NotifyModal
          variant={miscCtx.showNotifyModal.variant!}
          text={miscCtx.showNotifyModal.text!}
        />
      )}
      <nav className="z-30 flex justify-between w-full py-2 text-sm text-gray-100 bg-blue-600 border-b-2 border-blue-600 shadow md:text-base">
        <Link href="/">
          <h1
            onClick={() => miscCtx.resetFilters()}
            className="ml-2 text-3xl font-bold cursor-pointer md:ml-4"
          >
            Recipes
          </h1>
        </Link>
        {router.pathname !== "/login" && (
          <>
            <Link href="/add">
              <button className="p-2 mx-4 transition duration-150 ease-in-out bg-transparent border border-gray-100 rounded-md hover:bg-blue-700">
                Add
              </button>
            </Link>
            <div className="flex justify-end">
              {!authCtx.isLoggedIn ? (
                <Link href="/login">
                  <button className="p-2 mx-2 transition duration-150 ease-in-out bg-transparent border border-gray-100 rounded-md md:mx-4 hover:bg-blue-700">
                    Sign In
                  </button>
                </Link>
              ) : (
                <button
                  onClick={authCtx.logout}
                  className="p-2 mx-2 text-blue-600 transition duration-150 ease-in-out bg-transparent bg-gray-100 border border-gray-100 rounded-md md:mx-4 hover:bg-gray-200"
                >
                  Logout
                </button>
              )}
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
