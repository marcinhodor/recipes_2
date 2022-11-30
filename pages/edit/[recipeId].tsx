import { useRouter } from "next/router";
import { useContext, useLayoutEffect } from "react";
import AddEditForm from "../../components/AddEditForm";
import AuthContext from "../../context/auth-context";
import MiscContext from "../../context/misc-context";

const Modify = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const miscCtx = useContext(MiscContext);
  const recipeId = router.query.recipeId;

  useLayoutEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.push("/");
      miscCtx.setShowNoAccessModal(true);
    }
  }, []);

  if (typeof recipeId === "string") {
    return <AddEditForm recipeId={recipeId} />;
  }
  return <p>Recipe ID not provided</p>;
};

export default Modify;
