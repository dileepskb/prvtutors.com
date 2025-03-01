import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tdata } = body;
    const connection = await db();
    try {
      const [rows] = await connection.execute<RowDataPacket[]>(
        `SELECT id,name FROM ${tdata}`
      );
      await connection.end();
      return NextResponse.json(
        { message: "Get List", data: rows },
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Database error occurred." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 } 
    );
  }
}
