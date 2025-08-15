const { getStore } = require('@netlify/blobs');

// Initialize Netlify Blobs store
const getCommentsStore = () => {
  return getStore({
    name: 'comments',
    consistency: 'strong'
  });
};

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
    const store = getCommentsStore();

    if (event.httpMethod === 'GET') {
      // Get all comments from Netlify Blobs
      const commentsData = await store.get('all-comments', { type: 'json' });
      const comments = commentsData || [];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          comments: comments.map(comment => ({
            id: comment.id,
            name: comment.name,
            message: comment.message,
            avatar: comment.avatar || comment.name.charAt(0).toUpperCase(),
            createdAt: comment.createdAt,
            isPinned: comment.isPinned || false,
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

      // Get existing comments
      const existingComments = await store.get('all-comments', { type: 'json' }) || [];

      // Create new comment object
      const newComment = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        avatar: name.charAt(0).toUpperCase(),
        photo: photo || null,
        createdAt: new Date().toISOString(),
        isPinned: false,
      };

      // Add new comment to the beginning of the array
      const updatedComments = [newComment, ...existingComments].slice(0, 50); // Keep only latest 50

      // Save updated comments
      await store.set('all-comments', JSON.stringify(updatedComments));

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
        message: 'Internal server error'
      }),
    };
  }
};
