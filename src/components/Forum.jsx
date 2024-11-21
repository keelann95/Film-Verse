import { useState, useEffect } from 'react';
import { FaThumbsUp, FaReply } from 'react-icons/fa';
import Navbar from './Navbar';

export default function Forum() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5555/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Fetch Posts Response Status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch Error Response:', errorText);
          
          throw new Error(`Failed to fetch posts. Status: ${response.status}, Response: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched Posts Data:', data);
        
        const formattedPosts = data.map(post => ({
          id: post.id,
          text: post.content,
          title: post.title,
          author: post.user ? post.user.username : 'Anonymous',
          likes: 0,
          replies: 0,
          timeAgo: new Date(post.created_at).toLocaleString()
        }));

        setComments(formattedPosts);
      } catch (error) {
        console.error('Detailed Fetch Posts Error:', error);
        setError(error.message || 'Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5555/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Forum Comment',
          content: newComment
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to post comment. Status: ${response.status}, Response: ${errorText}`);
      }

      const newPostData = await response.json();

      // Add the new post to comments
      const newPost = {
        id: newPostData.id,
        text: newPostData.content,
        author: 'Current User',
        likes: 0,
        replies: 0,
        timeAgo: new Date().toLocaleString()
      };

      setComments([...comments, newPost]);
      setNewComment(''); 
    } catch (error) {
      console.error('Error posting comment:', error);
      setError(error.message || 'Failed to post comment');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-dark-light p-6 rounded-lg text-center">
        <h2 className="text-xl mb-4 text-white">Error</h2>
        <p className="text-gray-300 mb-4">{error}</p>
        <button 
          onClick={() => setError(null)} 
          className="bg-primary text-dark px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-dark-light p-6 rounded-lg">
      <Navbar />
      <div className="mb-6">
        <button className="text-gray-400 hover:text-white">Back</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Do you agree Spiderman 3 is the worst movie? Why?</h2>
        <div className="flex items-center space-x-4">
          <img src="/api/placeholder/50/50" alt="Movie" className="rounded-lg" />
          <div className="flex-1">
            <p className="text-gray-300">Share your thoughts about this movie...</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-700 pb-4">
            <div className="flex items-start space-x-4">
              <img
                src="/api/placeholder/40/40"
                alt={comment.author}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-gray-400 text-sm">{comment.timeAgo}</span>
                </div>
                <p className="text-gray-300 mb-3">{comment.text}</p>
                <div className="flex items-center space-x-4 text-gray-400">
                  <button className="flex items-center space-x-1 hover:text-primary">
                    <FaThumbsUp />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-primary">
                    <FaReply />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-4">
          <img src="/api/placeholder/40/40" alt="User" className="rounded-full" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-dark border border-gray-700 rounded-md p-2 text-white"
          />
          <button 
            onClick={handlePostComment}
            disabled={isLoading}
            className="bg-primary text-dark px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}