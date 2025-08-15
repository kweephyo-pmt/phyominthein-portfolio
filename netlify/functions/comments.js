const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Test database connection first
      await pool.query('SELECT 1');
      
      // Get all comments from PostgreSQL database
      const query = `
        SELECT id, name, message, avatar, photo, created_at, is_pinned
        FROM comments 
        ORDER BY is_pinned DESC, created_at DESC 
        LIMIT 50
      `;
      
      const result = await pool.query(query);
      const comments = result.rows;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          comments: comments.map(comment => ({
            id: comment.id.toString(),
            name: comment.name,
            message: comment.message,
            avatar: comment.avatar || comment.name.charAt(0).toUpperCase(),
            photo: comment.photo,
            createdAt: comment.created_at,
            isPinned: comment.is_pinned || false,
          }))
        }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Add new comment
      const { name, message, photo } = JSON.parse(event.body);

      // Validate required fields
      if (!name || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Name and message are required'
          }),
        };
      }

      // Insert new comment into PostgreSQL database
      const insertQuery = `
        INSERT INTO comments (name, message, avatar, photo, ip_address, user_agent)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, message, avatar, photo, created_at, is_pinned
      `;

      const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
      const userAgent = event.headers['user-agent'] || 'unknown';

      const values = [
        name.trim(),
        message.trim(),
        name.charAt(0).toUpperCase(),
        photo || null,
        clientIP,
        userAgent
      ];

      const result = await pool.query(insertQuery, values);
      const newComment = result.rows[0];

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Comment added successfully!',
          commentId: newComment.id,
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };

  } catch (error) {
    console.error('Comments API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: `Database error: ${error.message}`
      }),
    };
  }
};
