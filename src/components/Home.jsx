import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { FaPlayCircle } from "react-icons/fa";
import { BookmarkIcon } from "lucide-react";
import Footer from './Footer';
import { CiBookmark } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [moviesOnAwards, setMoviesOnAwards] = useState([]);
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [moreMoviesToDisplay, setMoreMoviesToDisplay] = useState([]);
  const [popularMoviesToDisplay, setPopularMoviesToDisplay] = useState([]);
  const [topRatedTVSeries, setTopRatedTVSeries] = useState([]);
  const [highlightedMovies, setHighlightedMovies] = useState([]); // Renamed state
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const limit = 10;
  const skip = 10;
  
  
  useEffect(() => {
    
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/trending');
        const data = await response.json();
        
        const transformedMovies = data.map((movie) => ({
          movie_name: movie.movie_name,
          runtime: movie.runtime || "Unknown",
          release_date: movie.release_date || "Unknown",
          genres: movie.name || [],
          overview: movie.overview || "No description available",
          backgroundImage: movie.movie_picture || "/api/placeholder/1920/1080",
        }));

        const limitedAndSkippedMovies = transformedMovies.slice(skip, skip + limit);
        setFeaturedMovies(limitedAndSkippedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (featuredMovies.length === 0) return;
  
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
  
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentSlide] || {
    movie_name: "Loading...",
    runtime: "...",
    release_date: "...",
    genres: [],
    overview: "Loading movie information...",
    backgroundImage: "/api/placeholder/1920/1080",
  };

  
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/popular');
        const data = await response.json();
  
        const transformedPopularMovies = data.map((movie) => ({
          movie_name: movie.movie_name,
          runtime: movie.runtime || "Unknown",
          release_date: movie.release_date || "Unknown",
          genres: movie.name || [],
          overview: movie.overview || "No description available",
          backgroundImage: movie.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        const limitedAndSkippedPopularMovies = transformedPopularMovies.slice(skip, skip + limit);
        setPopularMovies(limitedAndSkippedPopularMovies); // Set popular movies in the state
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
  
    fetchPopularMovies();
  }, []);
  
  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/upcoming');
        const data = await response.json();
  
        const transformedUpcomingMovies = data.map((movie) => ({
          movie_name: movie.movie_name,
          rating: movie.rating || "N/A",
          genres: movie.name || [],
          posterImage: movie.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        const limitedAndSkippedUpcomingMovies = transformedUpcomingMovies.slice(skip, skip + limit);
        setUpcomingMovies(limitedAndSkippedUpcomingMovies); // Set upcoming movies in state
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
  
    fetchUpcomingMovies();
  }, []);
  
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/popular');
        const movieData = await response.json();
  
        const formattedMovies = movieData.map((movie) => ({
          title: movie.movie_name,
          rating: movie.rating || "N/A",
          categories: movie.name || [],
          posterUrl: movie.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        const moviesToDisplay = formattedMovies.slice(50, 70); 
        setPopularMoviesList(moviesToDisplay); 
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
  
    fetchPopularMovies();
  }, []);
  
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/popular');
        const moviesData = await response.json();
  
        const formattedMovies = moviesData.map((movie) => ({
          title: movie.movie_name,
          rating: movie.rating || "N/A",
          genres: movie.name || [],
          posterUrl: movie.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        // Skip the first 72 movies and limit to the next 40
        const moviesToDisplay = formattedMovies.slice(72, 112); // Skip 72 and limit the next 40
        setPopularMoviesToDisplay(moviesToDisplay); // Store in state
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };
  
    fetchFeaturedMovies();
  }, []);
  
  useEffect(() => {
    const fetchMoreMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/popular');
        const movieData = await response.json();
  
        const formattedMovies = movieData.map((movie) => ({
          title: movie.movie_name,
          rating: movie.rating || "N/A",
          genres: movie.name || [],
          posterUrl: movie.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        // Skip the first 115 movies and limit the next 40
        const moviesToDisplay = formattedMovies.slice(115, 155); // Skip 115 and limit to next 40
        setMoreMoviesToDisplay(moviesToDisplay); // Store in state
      } catch (error) {
        console.error("Error fetching more movies:", error);
      }
    };
  
    fetchMoreMovies();
  }, []);

  useEffect(() => {
    const fetchTopRatedTVSeries = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/top_rated_tv_series');
        const tvSeriesData = await response.json();
  
        const formattedSeries = tvSeriesData.map((series) => ({
          title: series.series_name,
          rating: series.rating || "N/A",
          genres: series.name || [],
          posterUrl: series.movie_picture || "/api/placeholder/1920/1080",
        }));
  
        setTopRatedTVSeries(formattedSeries); // Store in state
      } catch (error) {
        console.error("Error fetching top-rated TV series:", error);
      }
    };
  
    fetchTopRatedTVSeries();
  }, []);
  
  
  useEffect(() => {
    const fetchMoviesOnAwards = async () => {
      try {
        const response = await fetch("https://film-verse-backend.onrender.com/trending");
        const moviesResponseData = await response.json();

        const filteredMovies = moviesResponseData.slice(100, 200);

        const formattedMoviesData = filteredMovies.map((movie) => ({
          title: movie.movie_name || "Unknown Title",
          rating: movie.rating || "N/A",
          genres: movie.name ? movie.name.join(", ") : "Unknown",
          posterUrl: movie.movie_picture || "/api/placeholder/1920/1080",
          parentalGuidance: movie.pg || "N/A",
        }));

        setMoviesOnAwards(formattedMoviesData);
      } catch (error) {
        console.error("Error fetching movies on awards:", error);
      }
    };

    fetchMoviesOnAwards();
  }, []);
  
  useEffect(() => {
    const fetchHighlightedMovies = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/trending');
        const data = await response.json();

        const transformedMovies = data.map((movie) => ({
          movie_name: movie.movie_name,
          runtime: movie.runtime || "Unknown",
          release_date: movie.release_date || "Unknown",
          genres: movie.name || [],
          overview: movie.overview || "No description available",
          backgroundImage: movie.movie_picture || "/api/placeholder/1920/1080",
        }));

        setHighlightedMovies(transformedMovies);
      } catch (error) {
        console.error("Error fetching highlighted movies:", error);
      }
    };

    fetchHighlightedMovies();
  }, []);

  
  const handleMovieClick = (movie) => {
    // Generalize the movie data by checking if keys exist
    const movieData = {
      movie_name: movie.movie_name || movie.title,  // Use either `movie_name` or `title`
      title: movie.movie_name || movie.title,  // Same for `title`
      backgroundImage: movie.posterImage || movie.backgroundImage || "/api/placeholder/1920/1080",  // Fallback to placeholder
      posterUrl: movie.posterImage || movie.backgroundImage || "/api/placeholder/1920/1080",  // Fallback to placeholder
      rating: movie.rating,
      runtime: movie.runtime,
      release_date: movie.release_date,
      genres: movie.name,
      overview: movie.overview
    };
  
    // Navigate to the movie details page, passing movie data
    navigate(`/movie/${encodeURIComponent(movie.movie_name || movie.title)}`, {
      state: movieData
    });
  };
  

  return (
    <>
      <main className='p-2 md:p-5'>
        
      <section 
      className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden" 
      style={{
        backgroundImage: `url(${currentMovie?.backgroundImage || "/api/placeholder/1920/1080"})`,  
        backgroundSize: "cover",  
        backgroundPosition: "center",  
        backgroundRepeat: "no-repeat", 
        zIndex: 0,
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="w-full absolute z-50">
        <Navbar />
      </div>

      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>

      <div 
        className="absolute inset-0" 
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 8))",
          zIndex: 10,
        }}
      ></div>

      <div className="relative z-20 px-4 sm:px-6 md:px-16 flex items-end h-full pb-10">
        <div className="max-w-2xl">
          <h1 className="text-[#fff] text-2xl sm:text-4xl md:text-5xl font-serif line-clamp-2">{currentMovie?.movie_name || "Movie Title"}</h1>

          <div className="pt-3 text-gray-400 flex flex-wrap items-center space-x-2 text-sm sm:text-base">
            <h3>{currentMovie?.runtime}</h3>
            <span className="mx-1 inline-block align-middle">-</span>
            <h3>{currentMovie?.release_date}</h3>
            {currentMovie?.genres?.map((genre, index) => (
              <React.Fragment key={index}>
                <span className="mx-1 inline-block align-middle">-</span>
                <h3>{genre}</h3>
              </React.Fragment>
            ))}
          </div>

          <p className="pt-3 text-gray-200 text-sm md:text-lg font-serif line-clamp-3">{currentMovie?.overview}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-5 items-start sm:items-center">
            <div className="flex items-center gap-4">
              <button 
                className="flex items-center bg-[#03A737] text-white rounded-md px-3 py-2 text-sm sm:text-base hover:bg-[#02812e] transition-colors duration-300 ease-in-out"
                aria-label="Watch Now"
                onClick={() => handleMovieClick(currentMovie)}  // Attach handleClick to the button
              >
                <FaPlayCircle className="mr-2" /> Watch Now
              </button>
              <button 
                className="flex items-center bg-transparent text-white px-3 py-2 text-sm sm:text-base border rounded-md hover:bg-gray-500 transition-colors duration-300 ease-in-out"
                aria-label="Add to Watchlist"
              >
                <BookmarkIcon className="mr-2" /> Add Watchlist
              </button>
            </div>

            <div className="flex space-x-1.5 mt-4 sm:mt-0 sm:ml-auto">
              {featuredMovies.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${index === currentSlide ? "bg-white" : "bg-gray-500"} transition-colors duration-300 ease-in-out`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    
        <header className="p-4 sm:p-8 text-2xl font-semibold pl-4 sm:pl-16">
          Just Released
        </header>
        <section className="flex overflow-x-auto space-x-4 px-4 sm:px-16 pb-4 scrollbar-hide">
          {upcomingMovies.map((movie, index) => (
            <div 
              key={index}
              onClick={() => handleMovieClick(movie)}
              className="cursor-pointer flex-shrink-0 group hover:scale-105 transition-transform duration-200"
            >
              <div className="w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-80 rounded-lg overflow-hidden">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img
                    className="rounded-lg w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-200"
                    src={movie.posterImage || "/api/placeholder/400/600"}
                    alt={movie.movie_name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h1 className="text-lg sm:text-xl font-semibold font-serif">
                        {movie.movie_name}
                      </h1>
                      <div className="flex items-center text-gray-400 gap-2 text-sm">
                        <span>⭐</span>
                        <span>{movie.rating || "N/A"}</span>
                        <span>|</span>
                        <div className="flex flex-wrap gap-1">
                          {movie.genres?.map((genre, i) => (
                            <span key={i} className="whitespace-nowrap">
                              {genre}
                              {i < movie.genres.length - 1 && ' | '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <header className="p-4 sm:p-8 text-2xl font-semibold pl-4 sm:pl-16">Popular of the Week</header>
      <section className="px-4 sm:px-16">
  <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
    {popularMovies.map((movie, index) => (
      <div 
        key={index} 
        onClick={() => handleMovieClick(movie)} 
        className="flex-shrink-0 shadow-sm shadow-gray-600 p-2 w-[300px] sm:w-[350px] md:w-[400px] rounded-2xl cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row">
          <span className="hidden sm:block pt-16 p-4 font-bold text-3xl">{index + 1}</span>
          <div className="flex flex-col sm:flex-row">
            <img
              className="rounded-2xl h-[20vh] w-[120px] object-cover"
              src={movie.backgroundImage || "/api/placeholder/400/600"}
              alt={movie.movie_name}
            />
            <div className="p-4 space-y-1">
              <h4 className="border w-14 p-1 border-dashed rounded-xl text-sm">PG-13</h4>
              <h1 className="text-xl font-serif line-clamp-2">{movie.movie_name}</h1>
              <div className="flex font-serif text-sm text-gray-600 gap-1 flex-wrap">
                <span className="text-sm">🎬</span>
                {movie.genres?.map((genre, i) => (
                  <span key={i} className="flex items-center">
                    <h1>{genre}</h1>
                    {i < movie.genres.length - 1 && <span className="mx-1">|</span>}
                  </span>
                ))}
              </div>
              <div className="flex gap-1 font-serif text-gray-300 text-sm">
                <span>⭐</span>
                <h1>{movie.runtime || "Unknown"}</h1>
                <span>|</span>
                <h1>{movie.release_date || "Unknown"}</h1>
              </div>
              <div className="pt-4">
                <button className="flex items-center bg-[#03A737] text-white rounded-md px-4 py-2 text-sm">
                  <FaPlayCircle className="mr-2" /> Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

<section
  style={{
    backgroundImage: "url(https://pixeldemonmg.co.uk/cdn/shop/files/megalopolis-movie-poster.jpg?v=1725796570&width=1214)",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
  className="relative w-full h-[60vh] p-8 pl-16 flex items-center"
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

  {/* Main Content Flex Container */}
  <div className="relative flex z-10 w-full items-center space-x-8">
    {/* Text Content */}
    <div className="text-white space-y-4 w-full md:w-[60%]">
      <h1 className="text-3xl font-semibold">Featured in Saintstream</h1>
      <p className="text-lg">Best featured for you</p>
      <h2 className="text-3xl font-bold font-serif">Air: Courting A Legend</h2>

      <div className="flex items-center gap-2 text-gray-300">
        <span>⭐</span>
        <span>|</span>
        <h5>2h40m</h5>
        <span>-</span>
        <h5>Superhero</h5>
        <span>-</span>
        <h5>Action</h5>
      </div>

      <p className="pt-3 text-gray-200 text-lg font-serif">
        Star Wars is an American epic space opera media franchise created <br />
        by George Lucas, which began with the eponymous 1977 film and quickly <br />
        became a worldwide pop culture phenomenon.
      </p>

      {/* Buttons */}
      <div className="flex items-center space-x-4 pt-4">
        <button className="flex items-center bg-[#03A737] text-white rounded-md px-4 py-2">
          <FaPlayCircle className="mr-2" /> Watch Now
        </button>
        <button className="flex items-center bg-transparent text-white px-4 py-2 border rounded-md hover:bg-gray-500">
          <CiBookmark className="mr-2" /> Add Watchlist
        </button>
      </div>
    </div>

 {/* Horizontally Scrollable Poster Section */}
<div className="w-full overflow-x-auto p-2">
  <div className="flex space-x-4">
    {popularMoviesList.map((movie, index) => (
      <div
        key={index}
        className="w-64 h-80 rounded-lg overflow-hidden flex-shrink-0 relative"
        onClick={() => handleMovieClick(movie)}  // Trigger handleMovieClick when poster is clicked
      >
        <img
          className="rounded-lg w-full h-full object-cover"
          src={movie.posterUrl}
          alt={movie.title}
        />

        {/* Poster Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-xl font-semibold font-serif">{movie.title}</h1>
            <div className="flex items-center text-gray-400 gap-2 font-semibold">
              <span>⭐</span>
              <span>{movie.rating}</span>
              <span>|</span>
              {movie.categories.map((category, i) => (
                <span key={i}>
                  {category}{i < movie.categories.length - 1 && ' | '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  </div>
</section>


<header className="p-8 pl-16 text-2xl font-semibold">Movies</header>
<div className="p-2">
  <section className="p-8 pl-16">
    <div className="flex gap-4 overflow-auto">
      {popularMoviesToDisplay.map((movie, index) => (
        <div
          key={index}
          onClick={() => handleMovieClick(movie)}  // Reusable click handler
          className="w-[17vw] p-2 cursor-pointer group hover:scale-105 transition-transform duration-200"
        >
          <div className="w-[30vw]">
            {/* Ensure posterUrl or posterImage is available, fallback to a placeholder image */}
            <img
              className="object-center object-cover rounded-2xl h-[20vh] w-[17vw]"
              src={movie.posterImage || movie.posterUrl || "/api/placeholder/400/600"}  // Adjust for different movie data keys
              alt={movie.title || movie.movie_name || 'Movie Poster'}  // Adjust for different title keys
            />
            <div className="p-4 space-y-1">
              <h1 className="text-2xl font-serif">{movie.title || movie.movie_name}</h1>  {/* Adjust for different title keys */}
              <div className="flex gap-2 font-serif text-gray-300 text-md">
                <span>⭐</span>
                <h1>{movie.rating}</h1>
                <span>|</span>
                <h1>{movie.genres.join(", ")}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>


<header className="p-8 pl-16 text-2xl font-semibold">Series</header>
<div className="p-2">
  <section className="p-8 pl-16">
    <div className="flex gap-8 overflow-auto">
      {moreMoviesToDisplay.map((movie, index) => (
        <div
          key={index}
          onClick={() => handleMovieClick(movie)}  // Added onClick to trigger handleMovieClick
          className="w-[17vw] p-2 cursor-pointer group hover:scale-105 transition-transform duration-200"
        >
          <div className="w-[17vw]">
            <img
              className="object-center object-cover rounded-2xl h-[20vh] w-[17vw]"
              src={movie.posterUrl || "/api/placeholder/400/600"}  // Fallback to placeholder
              alt={movie.title}
            />
            <div className="p-4 space-y-1">
              <h1 className="text-2xl font-serif">{movie.title}</h1>
              <div className="flex gap-2 font-serif text-gray-300 text-md">
                <span>⭐</span>
                <h1>{movie.rating}</h1>
                <span>|</span>
                <h1>{movie.genres.join(", ")}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>


<header className="p-8 pl-16 text-2xl font-semibold">Korean Series</header>
<div className="p-2">
  <section className="p-8 pl-16">
    <div className="flex gap-4 overflow-auto">
      {topRatedTVSeries.map((series, index) => (
        <div
          key={index}
          onClick={() => handleMovieClick(series)}  // Added onClick to trigger handleMovieClick
          className="w-[17vw] p-2 cursor-pointer group hover:scale-105 transition-transform duration-200"
        >
          <div className="w-[30vw]">
            <img
              className="object-center object-cover rounded-2xl h-[20vh] w-[17vw]"
              src={series.posterUrl || "/api/placeholder/400/600"}  // Fallback to placeholder
              alt={series.title}
            />
            <div className="p-4 space-y-1">
              <h1 className="text-2xl font-serif">{series.title}</h1>
              <div className="flex gap-2 font-serif text-gray-300 text-md">
                <span>⭐</span>
                <h1>{series.rating}</h1>
                <span>|</span>
                <h1>{series.genres.join(", ")}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>

<section className="p-4 pl-16">
  <div className="bg-gradient-to-br from-black via-zinc-900 to-slate-900 min-h-[70vh] text-white">
    <div className="flex justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium text-gray-200">Movies On Awards</span>
        <div className="flex gap-1">
          <button className="text-gray-400">&lt;</button>
          <button className="text-gray-400">&gt;</button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl text-gray-200">Fast</span>
        <div className="flex gap-1">
          <button className="text-gray-400">&lt;</button>
          <button className="text-gray-400">&gt;</button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl text-gray-200">Live</span>
        <div className="flex gap-1">
          <button className="text-gray-400">&lt;</button>
          <button className="text-gray-400">&gt;</button>
        </div>
      </div>
    </div>

    <div className="px-8">
      <div className="flex gap-6">
        <div className="w-[40%]">
          <div className="relative rounded-lg overflow-hidden h-[400px]">
            <img
              src="https://i0.wp.com/www.indesignskills.com/wp-content/uploads/2022/06/The-Batman-2.jpg?resize=850%2C1259&ssl=1"
              alt="Gundala"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h2 className="text-2xl font-bold">Gundala</h2>
              <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                <span className="text-yellow-400">⭐ 4.6</span>
                <span>|</span>
                <span>2h46m</span>
                <span>-</span>
                <span>2022</span>
                <span>-</span>
                <span>Superhero • Actions</span>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                When international arms dealer and criminal mastermind Elena Federova orchestrates seven...
              </p>
              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md">
                  <FaPlayCircle /> Play Now
                </button>
                <button className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-md">
                  <CiBookmark /> Add Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[60%] h-[48vh] grid grid-cols-3 overflow-auto gap-4">
          {moviesOnAwards.map((movie, index) => (
            <div
              key={index}
              onClick={() => handleMovieClick(movie)}  // Added onClick to trigger handleMovieClick
              className="relative cursor-pointer group hover:scale-105 transition-transform duration-200"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.posterUrl || "/api/placeholder/400/600"}  // Fallback to placeholder
                  alt={movie.title}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-black/50 px-2 py-1 text-xs rounded">{movie.parentalGuidance}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <h3 className="font-medium">{movie.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <span className="text-yellow-400">⭐</span>
                    <span>{movie.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{movie.genres}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
}

export default Home