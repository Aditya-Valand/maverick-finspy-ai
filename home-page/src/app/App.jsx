import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/global/Navbar';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

export default function App() {
  return (
    <Router>
      <div className="max-w-screen-2xl mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}
