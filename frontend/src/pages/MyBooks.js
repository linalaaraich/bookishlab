import React, { useState, useEffect } from 'react';
import { bookService } from '../services/api';
import BookCard from '../components/BookCard';
import { FaSearch } from 'react-icons/fa';
import '../styles/MyBooks.css';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    loadBooks();
  }, []);
  
  useEffect(() => {
    filterBooks();
  }, [books, filter, searchQuery]);
  
  const loadBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };
  
  const filterBooks = () => {
    let filtered = books;
    
    if (filter !== 'ALL') {
      filtered = filtered.filter(book => book.status === filter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredBooks(filtered);
  };
  
  return (
    <div className="my-books-page">
      <header className="page-header">
        <h1>My Books</h1>
        <p>Manage your reading collection</p>
      </header>
      
      <div className="controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={filter === 'ALL' ? 'active' : ''}
            onClick={() => setFilter('ALL')}
          >
            All
          </button>
          <button 
            className={filter === 'TO_BE_READ' ? 'active' : ''}
            onClick={() => setFilter('TO_BE_READ')}
          >
            To Be Read
          </button>
          <button 
            className={filter === 'CURRENTLY_READING' ? 'active' : ''}
            onClick={() => setFilter('CURRENTLY_READING')}
          >
            Reading
          </button>
          <button 
            className={filter === 'READ' ? 'active' : ''}
            onClick={() => setFilter('READ')}
          >
            Read
          </button>
        </div>
      </div>
      
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>
            {searchQuery 
              ? 'No books found matching your search.' 
              : 'No books in this category yet.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default MyBooks;
