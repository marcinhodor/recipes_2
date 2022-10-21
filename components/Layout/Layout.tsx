import React, { FC, PropsWithChildren } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  resetFilters?: Function;
  username: string;
  children: JSX.Element;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  resetFilters,
  username,
}) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar resetFilters={resetFilters} username={username} />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
