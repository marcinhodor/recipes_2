import React, { FC, PropsWithChildren } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  resetFilters: Function;
  username: string;
  children: JSX.Element;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  resetFilters,
  username,
}) => {
  return (
    <>
      <Navbar resetFilters={resetFilters} username={username} />
      <div>{children}</div>;{/* FOOTER */}
      <footer className="flex justify-center w-full h-12 mt-4 text-sm border-t">
        <a
          className="flex items-center justify-center gap-2 hover:text-blue-600"
          href="https://github.com/marcinhodor/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Marcin Hodor
        </a>
      </footer>
    </>
  );
};

export default Layout;
