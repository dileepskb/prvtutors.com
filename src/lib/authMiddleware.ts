import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "aerjsnm342354m5545jjjHhjs";

export const withAuth = (handler: Function) => {
  return async (request: NextRequest, ...args: any) => {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Decoded Token:", decoded);

      // Pass decoded user to the actual API handler
      return handler(request, decoded, ...args);
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  };
};
