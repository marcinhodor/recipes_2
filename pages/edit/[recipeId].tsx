import { useRouter } from "next/router";
import AddEditForm from "../../components/AddEditForm";

const Modify = () => {
  const router = useRouter();
  const recipeId = router.query.recipeId;

  if (typeof recipeId === "string") {
    return <AddEditForm recipeId={recipeId} />;
  }
  return <p>Recipe ID not provided</p>;
};

export default Modify;
