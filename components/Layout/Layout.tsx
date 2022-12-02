import React, { FC, PropsWithChildren, useContext } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import DeleteModal from "../DeleteModal";

interface LayoutProps {
  children: JSX.Element;
}

import MiscContext from "../../context/misc-context";

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  const miscCtx = useContext(MiscContext);
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {miscCtx.showDeleteModal && <DeleteModal />}
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
