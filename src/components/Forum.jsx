import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { showErrorAlert, showSuccessToast } from '../utils/alert';
import Navbar from './Navbar';
import Footer from './Footer';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showErrorAlert('Please login to view the forum');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5555/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      showErrorAlert('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showErrorAlert('Please login to like posts');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5555/posts/${postId}/like`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to like post');

      const { likes_count } = await response.json();

      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, likes: likes_count, liked_by_user: true }
            : post
        )
      );

      showSuccessToast('Post liked successfully');
    } catch (err) {
      console.error('Error liking post:', err);
      showErrorAlert('Failed to like post');
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      showErrorAlert('Please login to comment');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5555/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: commentText }),
        }
      );

      if (!response.ok) throw new Error('Failed to add comment');

      const newComment = await response.json();

      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...(post.comments || []), newComment],
              }
            : post
        )
      );

      setCommentText('');
      setActiveCommentPost(null);
      showSuccessToast('Comment added successfully');
    } catch (err) {
      console.error('Error adding comment:', err);
      showErrorAlert('Failed to add comment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Movie Discussions</h1>
          <button
            onClick={() => navigate('/create-post')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <MessageSquare size={20} />
            Create Post
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No posts yet. Be the first to start a discussion!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-gray-400 text-sm">
                      Posted by {post.user?.username} •{' '}
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 ${
                        post.liked_by_user
                          ? 'text-purple-400'
                          : 'text-gray-400 hover:text-purple-400'
                      }`}
                    >
                      <ThumbsUp size={18} />
                      <span>{post.likes || 0}</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveCommentPost(
                          activeCommentPost === post.id ? null : post.id
                        )
                      }
                      className="flex items-center gap-2 text-gray-400 hover:text-purple-400"
                    >
                      <MessageSquare size={18} />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>

                <p className="text-gray-300">{post.content}</p>

                {post.movie && (
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-semibold">
                      Movie: {post.movie.movie_name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <span>★ {post.movie.rating}/10</span>
                      <span>•</span>
                      <span>{post.movie.release_date}</span>
                    </div>
                  </div>
                )}

                {post.comments?.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="font-semibold text-gray-300">Comments</h4>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-900/50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-300">{comment.content}</p>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          by {comment.user?.username}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeCommentPost === post.id && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
