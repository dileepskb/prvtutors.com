import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/authMiddleware";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2/promise"; // Import RowDataPacket for proper typing

interface DecodedUser {
  id: number;
  email: string;
  role: string;
}

interface ProfileData {
  tutorId: number;
  cityId: number;
  courseId: string[];
  classType: string[];
  timing: string[];
}

export const POST = withAuth(async (request: NextRequest, decodedUser: DecodedUser) => {
  try {
    const body: ProfileData = await request.json();
    const { tutorId, cityId, courseId, classType, timing } = body;

    console.log("Decoded User:", decodedUser);

    const connection = await db();
    
    // Explicitly type the result using RowDataPacket[]
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT id FROM profile WHERE tutorId = ? AND cityId = ?`,
      [tutorId, cityId]
    );

    const existingData = rows as { id: number }[];

    const query = existingData.length
      ? `UPDATE profile SET courseId = ?, classType = ?, timing = ? WHERE tutorId = ? AND cityId = ?`
      : `INSERT INTO profile (tutorId, cityId, courseId, classType, timing) VALUES (?, ?, ?, ?, ?)`;

    const params = existingData.length
      ? [JSON.stringify(courseId), JSON.stringify(classType), JSON.stringify(timing), tutorId, cityId]
      : [tutorId, cityId, JSON.stringify(courseId), JSON.stringify(classType), JSON.stringify(timing)];

    const [updateData] = await connection.execute(query, params);
    await connection.end();

    return NextResponse.json({
      message: existingData.length > 0 ? "Profile Updated" : "Profile Inserted",
      data: updateData,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 });
  }
});
