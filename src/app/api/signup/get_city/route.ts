import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2/promise'; // Use RowDataPacket for SELECT queries
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    // Validate input
    if (!name) {
      return NextResponse.json(
        { error: 'City name is required.' },
        { status: 400 }
      );
    }

    const connection = await db();
    try {
      // SQL query to fetch city, state, and country
      const [rows] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          city.id,
          city.name AS cityName, 
          state.name AS stateName, 
          country.name AS countryName
         FROM city
         INNER JOIN state ON city.state_id = state.id
         INNER JOIN country ON state.country_id = country.id
         WHERE city.name LIKE ?  ORDER BY city.name ASC LIMIT 10`,
        [`${name}%`] // Use wildcard for partial matches
      );

      await connection.end();

      if (rows.length === 0) {
        return NextResponse.json(
          { message: 'No matching city found.' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: 'City found successfully!', data: rows },
        { status: 200 }
      );
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error occurred.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
