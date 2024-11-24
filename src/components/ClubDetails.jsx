import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Crown } from 'lucide-react';
import { showAuthRequired, showSuccessToast, showErrorAlert } from '../utils/alert';
import Navbar from './Navbar';

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        showAuthRequired();
        navigate('/login');
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`https://film-verse-backend.onrender.com/movie-clubs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            showAuthRequired();
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch club details');
        }

        const clubData = await response.json();
        setClub(clubData);

        const memberResponse = await fetch(`https://film-verse-backend.onrender.com/movie-clubs/${id}/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (memberResponse.ok) {
          const memberData = await memberResponse.json();
          setIsMember(memberData.isMember);
        }
      } catch (err) {
        console.error('Error fetching club details:', err);
        setError(err.message || 'Failed to load club details');
        showErrorAlert(err.message || 'Failed to load club details');
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id, navigate]);

  const handleJoinLeave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showAuthRequired();
      navigate('/login');
      return;
    }

    try {
      const method = isMember ? 'DELETE' : 'POST';
      const response = await fetch(`https://film-verse-backend.onrender.com/movie-clubs/${id}/members`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsMember(!isMember);
        showSuccessToast(isMember ? 'You left the club' : 'You joined the club');
        
        window.location.reload();
      } else {
        throw new Error('Failed to update membership');
      }
    } catch (err) {
      console.error('Error updating membership:', err);
      showErrorAlert('Failed to update membership');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {club && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{club.name}</h1>
            <p className="text-lg mb-6">{club.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Members</h3>
              <ul>
                {club.members.map((member) => {
                  const isAdmin = member.user.id === club.admin_id;

                  return (
                    <li key={member.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <Users className="mr-2" />
                        <span>{member.user.username}</span>
                      </div>
                      {isAdmin && <Crown className="text-yellow-500" />}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={handleJoinLeave}
              className={`
                w-full py-3 text-white font-semibold rounded-lg
                hover:bg-opacity-90 transition-colors
                ${isMember ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}
              `}
            >
              {isMember ? 'Leave Club' : 'Join Club'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubDetails;
