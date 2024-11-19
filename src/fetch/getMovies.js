const getMovies = async (apiUrl, offset = 0, maxResults = 10) => {
  try {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const formattedMovies = jsonData.map((film) => ({
      title: film.movie_name,
      duration: film.runtime || "Unknown",
      releaseYear: film.release_date || "Unknown",
      categories: film.name || [],
      description: film.overview || "No description available",
      posterImage: film.movie_picture || "/api/placeholder/1920/1080",
    }));

    return formattedMovies.slice(offset, offset + maxResults);
  } catch (err) {
    console.error("Error retrieving movies:", err);
    throw err; // Propagate the error to the calling code
  }
};

export default getMovies;
