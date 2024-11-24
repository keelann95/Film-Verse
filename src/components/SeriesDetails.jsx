import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Plus, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';

const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await fetch(`https://film-verse-backend.onrender.com/tv-series/${id}`);
        if (!response.ok) throw new Error('Failed to fetch series details');
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error('Error fetching series details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  const fetchSeasonEpisodes = async (seasonNumber) => {
    try {
      const response = await fetch(
        `https://film-verse-backend.onrender.com/tv_series/${id}/season/${seasonNumber}/episodes`
      );
      if (!response.ok) throw new Error('Failed to fetch episodes');
      const data = await response.json();
      setEpisodes(data.episodes);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading series details...</div>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-red-500 text-xl">Series not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <div 
        className="relative h-[70vh] w-full"
        style={{
          backgroundImage: `url(${series.movie_picture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {series.series_name}
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-300 mb-6">
              <span>⭐ {series.rating}/10</span>
              <span>•</span>
              <span>{series.episode_count} Episodes</span>
              <span>•</span>
              <span>{series.season_count} Seasons</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {series.genres?.map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-800/80 rounded-full text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-8 line-clamp-3 md:line-clamp-none">
              {series.overview}
            </p>

            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Seasons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: series.season_count }, (_, i) => i + 1).map((seasonNumber) => (
            <div
              key={seasonNumber}
              className="bg-gray-800/50 rounded-lg overflow-hidden group cursor-pointer"
              onMouseEnter={() => {
                setSelectedSeason(seasonNumber);
                fetchSeasonEpisodes(seasonNumber);
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Season {seasonNumber}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                
                {selectedSeason === seasonNumber && (
                  <div className="space-y-4 mt-4">
                    {episodes.map((episode) => (
                      <div
                        key={episode.id}
                        className="bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-white">
                              Episode {episode.episode_number}
                            </h4>
                            <p className="text-sm text-gray-400">{episode.episode_name}</p>
                          </div>
                          <Play className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                          {episode.overview}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;