import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResultSetHeader } from 'mysql2/promise'; // Import ResultSetHeader if not already

const JWT_SECRET = process.env.JWT_SECRET || 'aerjsnm342354m5545jjjHhjs';

// Database connection utility
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    const connection = await db();
    try {
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO user (name, email, password, role, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [name, email, hashedPassword, role]
      );

      const userId = result.insertId;
      // Close connection
      await connection.end();

      // Generate JWT
      const token = jwt.sign({ userId, email, role }, JWT_SECRET, {
        expiresIn: '1h', // Set token expiration time
      });

      return NextResponse.json(
        { message: 'User created successfully!', token },
        { status: 201 }
      );
    } catch (dbError: any) {
      // Check for duplicate email error (MySQL error code for duplicate entry is 1062)
      if (dbError.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
          { error: 'Email already exists.' },
          { status: 409 } // Conflict status code
        );
      }
      throw dbError; // Re-throw if not a duplicate entry error
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
