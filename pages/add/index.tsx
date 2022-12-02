import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useLayoutEffect } from "react";
import AddModifyForm from "../../components/AddEditForm";

import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";

const Add: NextPage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const miscCtx = useContext(MiscContext);

  useLayoutEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.push("/");
      miscCtx.setShowNotifyModal({ show: true });
    }
  }, []);

  return <AddModifyForm />;
};

export default Add;
