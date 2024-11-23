import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SeriesDetails from './components/SeriesDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import InfluencerPage from './components/InfluencerPage';
import Clubs from './components/Clubs';
import ClubDetails from './components/ClubDetails';
import CreateClub from './components/CreateClub';
import Forum from './components/Forum';
import CreatePost from './components/CreatePost';
import UpdateProfile from './components/UpdateProfile';
import { MovieProvider } from './components/MovieProvider';

const App = () => {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/influencer" element={<InfluencerPage />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubDetails />} />
          <Route path="/clubs/create" element={<CreateClub />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
};

export default App;