import React from 'react';
import { CiBookmark } from 'react-icons/ci';
import { FaPlayCircle } from 'react-icons/fa';
import Navbar from './Navbar';


const MoviePage = () => {
  // Sample data
  const newMovies = [
    { title: 'The Old Way', image: 'https://via.placeholder.com/150' },
    { title: 'Plane', image: 'https://via.placeholder.com/150' },
    { title: 'Unlocked', image: 'https://via.placeholder.com/150' },
    { title: 'Children of Corn', image: 'https://via.placeholder.com/150' },
    { title: 'Avatar: The Way of Water', image: 'https://via.placeholder.com/150' },
  ];

  const likedMovies = [
    { title: 'The Covenant', image: 'https://via.placeholder.com/150' },
    { title: 'Spider-Man', image: 'https://via.placeholder.com/150' },
    { title: 'Oppenheimer', image: 'https://via.placeholder.com/150' },
    { title: 'Top Gun: Maverick', image: 'https://via.placeholder.com/150' },
    { title: 'The End Movie', image: 'https://via.placeholder.com/150' },
  ];

  const hotTopics = [
    { title: 'The Man from Toronto', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'Elvis', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'Spiderman 3', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'The Mechanic', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'The End Movie', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'Three Thousand Years of Longing', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'Top Gun Maverick', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
    { title: 'Spiderman: Into The Spiderverse', type: 'Comedy • Action', rating: 4.6, reviews: 45, discussion: 9, image: 'https://via.placeholder.com/150' },
  ];

  const popularDiscussions = [
    {
      title: 'Do you agree the Spiderman 3 is the worst movie? Why?',
      text: 'Ahmad Modi lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet. lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet.',
      likes: 65,
      comments: 10,
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Spiderman: Into The Spiderverse second movie?',
      text: 'Ahmad Modi lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet. lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet.',
      likes: 0,
      comments: 0,
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Top Gun is propaganda for the Movie World?',
      text: 'Ahmad Modi lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet. lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet.',
      likes: 432,
      comments: 65,
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Jason Statham injuries in the Mechanic Movie is real?',
      text: 'Ahmad Modi lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet. lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet.',
      likes: 43,
      comments: 4,
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div>


<section
          className="relative  w-full h-[80vh]"
          style={{
            backgroundImage: "url(https://www.komar.de/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 8))",
              zIndex: 10,
            }}
          ></div>
          <div className="relative z-50">
            {/* <Navbar /> */}
          </div>
          <div className=' relative z-20 transform translate-y-72 pl-16'>
            <div>
                <h1 className=' text-[#fff] text-7xl pt-40 font-serif'>Become best movie influencer</h1>
              

 
            </div>

          </div>
        </section>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">New Movie</h2>
        <div className="grid grid-cols-5 gap-4">
          {newMovies.map((movie, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={movie.image} alt={movie.title} className="w-full h-auto mb-2" />
              <h3 className="text-center">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Liked Movie</h2>
        <div className="grid grid-cols-5 gap-4">
          {likedMovies.map((movie, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={movie.image} alt={movie.title} className="w-full h-auto mb-2" />
              <h3 className="text-center">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Hot Movie Topics</h2>
        <div className="grid grid-cols-4 gap-4">
          {hotTopics.map((topic, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={topic.image} alt={topic.title} className="w-full h-auto mb-2" />
              <h3 className="text-center">{topic.title}</h3>
              <p className="text-center text-gray-500">{topic.type}</p>
              <div className="flex items-center justify-center text-yellow-500">
                <span className="mr-1">{topic.rating}</span>
                <span className="mr-1">({topic.reviews})</span>
                <span>• {topic.discussion} Discussion</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Popular Discussion</h2>
        {popularDiscussions.map((discussion, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <img src={discussion.image} alt={discussion.title} className="w-8 h-8 rounded-full mr-2" />
              <input type="text" placeholder="Add Discussion title" className="flex-1 bg-transparent border-b border-gray-500 focus:outline-none" />
              <button className="ml-2 bg-green-500 text-white px-4 py-2 rounded">Post</button>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="font-bold mb-2">{discussion.title}</h3>
              <p className="text-gray-400 mb-2">{discussion.text}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">{discussion.likes}</span>
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-gray-400">{discussion.comments} Comments</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;