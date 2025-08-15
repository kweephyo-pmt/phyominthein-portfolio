import { useState, useEffect } from 'react';

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments from API
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/.netlify/functions/comments');
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new comment
  const addComment = async (commentData) => {
    try {
      const response = await fetch('/.netlify/functions/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh comments after adding
        await fetchComments();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      return { success: false, message: 'Failed to add comment' };
    }
  };

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    loading,
    error,
    addComment,
    refreshComments: fetchComments,
    formatTimeAgo,
  };
};

export default useComments;
