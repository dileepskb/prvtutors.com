import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "aerjsnm342354m5545jjjHhjs";

export const verifyToken = (request: NextRequest) => {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);
    return { decoded };
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return { error: "Invalid token", status: 401 };
  }
};
