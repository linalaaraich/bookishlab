import React, { useState, useEffect } from 'react';
import { bookService } from '../services/api';
import BookCard from '../components/BookCard';
import { FaSearch } from 'react-icons/fa';
import '../styles/Explore.css';

function Explore() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadDefaultBooks();
  }, []);
  
  const loadDefaultBooks = async () => {
    setLoading(true);
    try {
      const response = await bookService.exploreBooks('bestseller');
      setBooks(response.data);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await bookService.exploreBooks(searchQuery);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToLibrary = async (book) => {
    try {
      book.status = 'TO_BE_READ';
      await bookService.createBook(book);
      alert('Book added to your library!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. It may already be in your library.');
    }
  };
  
  const loadCategory = async (category) => {
    setLoading(true);
    try {
      const response = await bookService.exploreBooks(category);
      setBooks(response.data);
    } catch (error) {
      console.error('Error loading category:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="explore-page">
      <header className="page-header">
        <h1>Explore Books</h1>
        <p>Discover your next great read</p>
      </header>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </div>
      </form>
      
      <div className="category-filters">
        <button onClick={() => loadCategory('fiction')}>Fiction</button>
        <button onClick={() => loadCategory('fantasy')}>Fantasy</button>
        <button onClick={() => loadCategory('mystery')}>Mystery</button>
        <button onClick={() => loadCategory('romance')}>Romance</button>
        <button onClick={() => loadCategory('science fiction')}>Sci-Fi</button>
        <button onClick={() => loadCategory('thriller')}>Thriller</button>
        <button onClick={() => loadCategory('biography')}>Biography</button>
        <button onClick={() => loadCategory('history')}>History</button>
      </div>
      
      {loading ? (
        <div className="loading">Loading books...</div>
      ) : books.length > 0 ? (
        <div className="books-grid">
          {books.map((book, index) => (
            <BookCard 
              key={book.googleBooksId || index} 
              book={book} 
              onAddToLibrary={handleAddToLibrary}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No books found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
}

export default Explore;
