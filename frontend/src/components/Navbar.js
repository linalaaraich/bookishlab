import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBook, FaCompass, FaQuestionCircle, FaHome } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <FaBook className="brand-icon" />
          Bookishlab
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <FaHome /> Home
          </Link>
          <Link 
            to="/my-books" 
            className={`nav-link ${isActive('/my-books') ? 'active' : ''}`}
          >
            <FaBook /> My Books
          </Link>
          <Link 
            to="/explore" 
            className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
          >
            <FaCompass /> Explore
          </Link>
          <Link 
            to="/quiz" 
            className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}
          >
            <FaQuestionCircle /> Quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
