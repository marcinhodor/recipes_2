// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Recipe } from "../../models/interfaces";

import firestore from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Recipe[]>
) {
  const receivedRecipes: Recipe[] = [];
  const querySnapshot = await getDocs(collection(firestore, "recipes"));
  querySnapshot.forEach((doc) => {
    const recipesObject: Recipe = {
      id: doc.id,
      title: doc.data().title,
      link: doc.data().link,
      tags: doc.data().tags,
    };
    // console.log(doc.id, doc.data());
    receivedRecipes.push(recipesObject);
  });
  res.status(200).json(receivedRecipes);
}
