
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogSection from './components/BlogSection';
import ModernHeader from './components/ModernHeader';
import ModernFooter from './components/ModernFooter';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import CarManagement from './pages/CarManagement.jsx';
import News from './pages/News';
import ParkingPage from './pages/ParkingPage';
import BlogDetail from './pages/BlogDetail';
import Videos from './pages/Videos';
import YouTube from './pages/YouTube';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ModernHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:brand/:name" element={<CarDetail />} />
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/youtube" element={<YouTube />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/management-dashboard-93cars" element={<CarManagement />} />
            <Route path="/blog" element={<BlogSection />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<BlogDetail />} />
          </Routes>
        </main>
        <ModernFooter />
      </div>
    </Router>
  );
}

export default App;
