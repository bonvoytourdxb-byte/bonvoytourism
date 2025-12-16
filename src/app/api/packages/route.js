import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination');

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // let packageQuery = `
    //   SELECT p.*, d.name AS destination_name
    //   FROM packages p
    //   JOIN destinations d ON p.destination_id = d.id
    // `;
    // const params = [];
    // if (destination) {
    //   packageQuery += " WHERE d.name = ?";
    //   params.push(destination);
    // }
    // const [packages] = await connection.execute(packageQuery, params);
    let packageQuery = `
  SELECT p.*, d.name AS destination_name
  FROM packages p
  JOIN destinations d ON p.destination_id = d.id
`;

    const params = [];
    if (destination) {
      packageQuery += " WHERE d.name = ?";
      params.push(destination);
    }

    packageQuery += " ORDER BY p.id ASC";

    const [packages] = await connection.execute(packageQuery, params);


    const [destinations] = await connection.execute("SELECT name FROM destinations");

    await connection.end();

    return NextResponse.json({ packages, destinations });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
