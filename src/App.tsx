
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogSection from './components/BlogSection';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import OnRoadPrice from './pages/CarVariantsTable/OnRoadPrice';
import VideoGallery from './pages/VideoGallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import News from './pages/News';
import BlogDetail from './pages/BlogDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/on-road-price/:statename" element={<OnRoadPrice />} />
            <Route path="/videos" element={<VideoGallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/management-dashboard-93cars" element={<Admin />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<BlogDetail />} />
            <Route path="/cars/:brand/:name" element={<CarDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;