import React, { FC, PropsWithChildren } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
