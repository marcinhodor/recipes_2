// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Recipe } from "../../models/interfaces";

import firestore from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data: Recipe = req.body;

      const docRef = await addDoc(collection(firestore, "recipes"), data);
      console.log("Document written with ID: ", docRef.id);

      res.status(200).send("OK");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save data" });
    }
  }
}
