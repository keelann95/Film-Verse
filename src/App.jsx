import CreateProfile from './components/CreateProfile';
import Forum from './components/Forum';
import Home from './components/Home'
import Login from './components/Login';
import MovieDetails from './components/MovieDetails';
import MoviePage from './components/MoviePage';
import { MovieProvider } from './components/MovieProvider';
// import { MyProfilePage, PostComponent, ProfileHeader } from './components/MyPage';
import Signup from './components/Signup';
import Tracker from './components/Tracker'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

 

  return (
    <>
    <MovieProvider>

  
    <div>
      {/* <MoviePage /> */}
    </div>
       <Router>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/discover" element={<MoviePage />} />
          {/* <Route path="/releases" element={<MovieReleases />} /> */}
          <Route path="/forum" element={<Forum />} />
          {/* <Route path="/about" element={<PostComponent />} /> */}
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:movieName" element={<MovieDetails />} /> 


        </Routes>
     
    </Router>
    </MovieProvider>
    </>
  )
}

export default App
