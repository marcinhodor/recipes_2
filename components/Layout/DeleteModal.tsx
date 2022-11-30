import { useRouter } from "next/router";
import Button from "./Button";

import MiscContext from "../../context/misc-context";
import { useContext } from "react";

const DeleteModal = () => {
  const router = useRouter();
  const miscCtx = useContext(MiscContext);

  const handleDelete = async (recipeId: string) => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recipeId,
        }),
      });
      miscCtx.setShowDeleteModal(false);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed z-50 w-full h-full bg-black bg-opacity-30">
      <div className="relative flex flex-col w-64 p-2 mx-auto bg-white border border-gray-100 rounded-md shadow md:p-4 top-10 md:top-32">
        <div className="mb-2 ml-2 md:mb-4">Are you sure?</div>
        <div className="flex justify-around">
          <div onClick={() => handleDelete("id")}>
            <Button variant="red">Delete</Button>
          </div>
          <div onClick={() => miscCtx.setShowDeleteModal(false)}>
            <Button variant="gray">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
