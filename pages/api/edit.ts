// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Recipe } from "../../models/interfaces";

import firestore from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const data: Recipe = req.body;

      const recipeRef = doc(firestore, "recipes", data.id);
      await updateDoc(recipeRef, {
        title: req.body.title,
        link: req.body.link,
        tags: req.body.tags,
      });

      res.status(200).send("OK");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save data" });
    }
  }
}
