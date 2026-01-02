import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import '../styles/BookCard.css';

function BookCard({ book, onAddToLibrary }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (book.id) {
      navigate(`/book/${book.id}`);
    }
  };
  
  const handleAddClick = (e) => {
    e.stopPropagation();
    if (onAddToLibrary) {
      onAddToLibrary(book);
    }
  };
  
  const imageUrl = book.imageUrl || book.smallImageUrl || '/placeholder-book.png';
  const authors = book.authors?.join(', ') || 'Unknown Author';
  
  return (
    <div className="book-card" onClick={handleClick}>
      <div className="book-image-container">
        <img 
          src={imageUrl} 
          alt={book.title}
          className="book-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/128x192/3B82F6/FFFFFF?text=No+Image';
          }}
        />
        {book.personalRating && (
          <div className="book-rating-badge">
            <FaStar /> {book.personalRating.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{authors}</p>
        
        {book.categories && book.categories.length > 0 && (
          <div className="book-categories">
            {book.categories.slice(0, 2).map((cat, idx) => (
              <span key={idx} className="category-badge">{cat}</span>
            ))}
          </div>
        )}
        
        {book.tags && book.tags.length > 0 && (
          <div className="book-tags">
            {book.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag.id} 
                className="tag-badge"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        
        {onAddToLibrary && !book.id && (
          <button 
            className="add-to-library-btn"
            onClick={handleAddClick}
          >
            + Add to Library
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;
