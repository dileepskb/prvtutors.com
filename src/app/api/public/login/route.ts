import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "@/lib/db";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const connection = await db();

    // Check if user exists
    const [rows]: any = await connection.execute(
      "SELECT id, name, email, password FROM user WHERE email = ?",
      [email]
    );

    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error:unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
