import mysql from 'mysql2/promise';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });
    }

    // Connect to database using environment variables
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute(
      'SELECT * FROM package_detail WHERE package_id = ?',
      [id]
    );

    await connection.end(); // Close the connection

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Package not found' }), { status: 404 });
    }

    // Parse JSON columns
    const package_detail = {
      ...rows[0],
      highlights: JSON.parse(rows[0].highlights || '[]'),
      departure_details: JSON.parse(rows[0].departure_details || '[]'),
      return_details: JSON.parse(rows[0].return_details || '[]'),
      additional_info: JSON.parse(rows[0].additional_info || '[]'),
      terms_conditions: JSON.parse(rows[0].terms_conditions || '[]'),
      cancellation_policy: JSON.parse(rows[0].cancellation_policy || '[]'),
      faqs: JSON.parse(rows[0].faqs || '[]'),
      price_includes: JSON.parse(rows[0].price_includes || '[]'),
      price_excludes: JSON.parse(rows[0].price_excludes || '[]'),
      tags: JSON.parse(rows[0].tags || '[]')
    };

    return new Response(JSON.stringify({ package_detail }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
