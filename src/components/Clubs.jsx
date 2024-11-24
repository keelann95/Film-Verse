import React, { useEffect, useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { showAuthRequired, showSuccessToast, showErrorAlert } from '../utils/alert';
import Navbar from './Navbar';
import Footer from './Footer';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);  
  const navigate = useNavigate();

  console.log(clubs);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://film-verse-backend.onrender.com/genres');  
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data);  
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchClubs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        showAuthRequired();
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://film-verse-backend.onrender.com/movie-clubs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            showAuthRequired();
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch clubs');
        }

        const data = await response.json();
        setClubs(data);

        console.log(clubs);
        
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Failed to load clubs');
        showErrorAlert('Failed to load clubs');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading clubs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Movie Clubs</h1>
          <Link
            to="/clubs/create"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <UserPlus size={20} />
            Create Club
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => {
            const genre = genres.find((g) => g.id === club.genre_id);
            const genreName = genre ? genre.name : 'General';  
            
            return (
              <Link
                key={club.id}
                to={`/clubs/${club.id}`}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                    {club.name}
                  </h2>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {genreName}  
                  </span>
                </div>
                
                <p className="text-gray-400 mb-6 line-clamp-2">{club.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users size={18} />
                    <span>{club.members?.length || 0} members</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    Created by {club.admin?.username || "Unknown"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Clubs;
