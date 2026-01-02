import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen, FaCheckCircle, FaQuoteRight } from 'react-icons/fa';
import { bookService, quoteService } from '../services/api';
import BookCard from '../components/BookCard';
import '../styles/Home.css';

function Home() {
  const [stats, setStats] = useState({
    toRead: 0,
    reading: 0,
    read: 0,
    quotes: 0
  });
  const [recentBooks, setRecentBooks] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const booksRes = await bookService.getAllBooks();
      const books = booksRes.data;
      
      setStats({
        toRead: books.filter(b => b.status === 'TO_BE_READ').length,
        reading: books.filter(b => b.status === 'CURRENTLY_READING').length,
        read: books.filter(b => b.status === 'READ').length,
      });
      
      setRecentBooks(books.slice(0, 4));
      
      const quotesRes = await quoteService.getAllQuotes();
      if (quotesRes.data.length > 0) {
        const randomIdx = Math.floor(Math.random() * quotesRes.data.length);
        setRandomQuote(quotesRes.data[randomIdx]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  
  return (
    <div className="home-page">
      <header className="home-hero">
        <h1>Welcome to Bookishlab</h1>
        <p>Your personal reading companion</p>
      </header>
      
      <div className="stats-grid">
        <div className="stat-card">
          <FaBook className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.toRead}</h3>
            <p>To Be Read</p>
          </div>
        </div>
        
        <div className="stat-card">
          <FaBookOpen className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.reading}</h3>
            <p>Currently Reading</p>
          </div>
        </div>
        
        <div className="stat-card">
          <FaCheckCircle className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.read}</h3>
            <p>Books Read</p>
          </div>
        </div>
      </div>
      
      {randomQuote && (
        <div className="quote-section">
          <FaQuoteRight className="quote-icon" />
          <blockquote className="random-quote">
            "{randomQuote.text}"
          </blockquote>
        </div>
      )}
      
      <section className="recent-section">
        <div className="section-header">
          <h2>Recent Books</h2>
          <Link to="/my-books" className="view-all-link">View All →</Link>
        </div>
        
        {recentBooks.length > 0 ? (
          <div className="books-grid">
            {recentBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No books yet! Start by exploring our collection.</p>
            <Link to="/explore" className="cta-button">Explore Books</Link>
          </div>
        )}
      </section>
      
      <section className="cta-section">
        <h2>Discover Your Next Read</h2>
        <p>Take our quiz to get personalized book recommendations</p>
        <Link to="/quiz" className="cta-button">Take the Quiz</Link>
      </section>
    </div>
  );
}

export default Home;
