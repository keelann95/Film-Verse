import { useState } from 'react';
import { FaThumbsUp, FaReply } from 'react-icons/fa';

export default function Forum() {
  const [comments] = useState([
    {
      id: 1,
      text: "I think with his newfound family focused on the planet of Pandora. Once a familiar threat returns to finish what they started before, Jake must work with Neytiri and the army of the Na'vi race to protect their planet.",
      author: "JohnDoe",
      likes: 25,
      replies: 3,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      text: "And Jake must work with Neytiri and the army of the Na'vi race to protect their planet",
      author: "JaneSmith",
      likes: 15,
      replies: 2,
      timeAgo: "1 hour ago"
    },
    {
      id: 3,
      text: "Love it",
      author: "MovieFan",
      likes: 10,
      replies: 1,
      timeAgo: "30 mins ago"
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto bg-dark-light p-6 rounded-lg">
      <div className="mb-6">
        <button className="text-gray-400 hover:text-white">Back</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Do you agree the Spiderman 3 is the worst movie? Why?</h2>
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/50" alt="Movie" className="rounded-lg" />
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
                src={`https://via.placeholder.com/40`}
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
          <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-dark border border-gray-700 rounded-md p-2 text-white"
          />
          <button className="bg-primary text-dark px-4 py-2 rounded-md hover:bg-primary/90">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
