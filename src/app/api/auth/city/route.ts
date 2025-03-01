import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, city } = body;

    // Validate input
    if (!userId || !city) {
      return NextResponse.json(
        { error: 'User ID and city are required.' },
        { status: 400 }
      );
    }

    // Update user city in the database
    const connection = await db();
    await connection.execute(
      `UPDATE user SET city = ?, updatedAt = NOW() WHERE id = ?`,
      [city, userId]
    );

    // Close connection
    await connection.end();

    return NextResponse.json(
      { message: 'City updated successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating city:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
