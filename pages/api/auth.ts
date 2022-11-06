import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      res.status(data.error.code).json({ error: data.error.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load data" });
  }
}
