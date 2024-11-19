import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import Tracker from './components/Tracker'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

 

  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/discover" element={<Discover />} />
          <Route path="/releases" element={<MovieReleases />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/movie/:id" element={<MovieDetails />} />

        </Routes>
     
    </Router>
    </>
  )
}

export default App
