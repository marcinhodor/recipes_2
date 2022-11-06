import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middleware = (req: NextRequest) => {
  const loggedIn = req.cookies.get("loggedIn") === "yes";
  const url = req.url;
  if (!loggedIn && url.includes("/add")) {
    return NextResponse.redirect("http://localhost:3000");
  }
};

export default middleware;
