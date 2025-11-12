import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import Footer from './components/Footer/Footer';
import MovieInfo from './pages/MovieInfo/MovieInfo';
import Discover from './pages/Discover/Discover';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="Discover" element={<Discover />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
