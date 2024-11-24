/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MessageCircle, Share2 } from 'lucide-react';

const PostCard = ({ post, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      return; 
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not logged in');
      return;
    }

    try {
      const response = await fetch(`https://film-verse-backend.onrender.com/posts/${post.id}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newComment = await response.json();
      onCommentSubmit(post.id, newComment);
      setCommentContent('');
      setToastMessage('Your comment has been added');
      
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 transition-all hover:border-purple-500/50">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.user.profile_picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"}
          alt={post.user.username}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-sm sm:text-base truncate">{post.user.username}</h3>
          <p className="text-xs sm:text-sm text-gray-400">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <h4 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h4>
      <p className="text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">{post.content}</p>
      
      <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base">
        <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-500 transition-colors">
          <MessageCircle size={18} />
          <span className="hidden xs:inline">Comment</span>
        </button>
        <button className="flex items-center gap-1 sm:gap-2 hover:text-green-500 transition-colors">
          <Share2 size={18} />
          <span className="hidden xs:inline">Share</span>
        </button>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 bg-gray-700 text-white text-sm rounded-lg"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg">Post</button>
      </form>

      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default PostCard;
