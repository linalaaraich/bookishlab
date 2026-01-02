import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService, reviewService, quoteService } from '../services/api';
import { FaStar, FaTag, FaQuoteLeft, FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [quoteText, setQuoteText] = useState('');
  const [quotePage, setQuotePage] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#3B82F6');
  
  useEffect(() => {
    loadBookDetails();
  }, [id]);
  
  const loadBookDetails = async () => {
    try {
      const bookRes = await bookService.getBookById(id);
      setBook(bookRes.data);
      
      const reviewsRes = await reviewService.getReviewsByBookId(id);
      setReviews(reviewsRes.data);
      
      const quotesRes = await quoteService.getQuotesByBookId(id);
      setQuotes(quotesRes.data);
    } catch (error) {
      console.error('Error loading book details:', error);
    }
  };
  
  const handleStatusChange = async (e) => {
    try {
      await bookService.updateBookStatus(id, e.target.value);
      loadBookDetails();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const handleRatingChange = async (rating) => {
    try {
      await bookService.updateBookRating(id, rating);
      loadBookDetails();
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };
  
  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await reviewService.createReview(id, reviewContent, reviewRating);
      setReviewContent('');
      setReviewRating(5);
      setShowReviewForm(false);
      loadBookDetails();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Delete this review?')) {
      try {
        await reviewService.deleteReview(reviewId);
        loadBookDetails();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };
  
  const handleAddQuote = async (e) => {
    e.preventDefault();
    try {
      await quoteService.createQuote(id, quoteText, quotePage, quoteNotes);
      setQuoteText('');
      setQuotePage('');
      setQuoteNotes('');
      setShowQuoteForm(false);
      loadBookDetails();
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  };
  
  const handleDeleteQuote = async (quoteId) => {
    if (window.confirm('Delete this quote?')) {
      try {
        await quoteService.deleteQuote(quoteId);
        loadBookDetails();
      } catch (error) {
        console.error('Error deleting quote:', error);
      }
    }
  };
  
  const handleAddTag = async (e) => {
    e.preventDefault();
    try {
      await bookService.addTag(id, tagName, tagColor);
      setTagName('');
      setTagColor('#3B82F6');
      setShowTagForm(false);
      loadBookDetails();
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };
  
  const handleDeleteTag = async (tagId) => {
    try {
      await bookService.removeTag(id, tagId);
      loadBookDetails();
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };
  
  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book from your library?')) {
      try {
        await bookService.deleteBook(id);
        navigate('/my-books');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };
  
  if (!book) {
    return <div className="loading">Loading book details...</div>;
  }
  
  return (
    <div className="book-detail-page">
      <div className="book-header">
        <div className="book-cover">
          <img 
            src={book.imageUrl || 'https://via.placeholder.com/300x450/3B82F6/FFFFFF?text=No+Image'} 
            alt={book.title}
          />
        </div>
        
        <div className="book-info-section">
          <h1>{book.title}</h1>
          {book.subtitle && <h2 className="subtitle">{book.subtitle}</h2>}
          <p className="authors">{book.authors?.join(', ')}</p>
          
          <div className="book-meta">
            {book.publishedDate && <span>Published: {book.publishedDate}</span>}
            {book.publisher && <span>Publisher: {book.publisher}</span>}
            {book.pageCount && <span>Pages: {book.pageCount}</span>}
          </div>
          
          <div className="rating-section">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`star ${book.personalRating >= star ? 'filled' : ''}`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
            {book.personalRating && (
              <span className="rating-value">{book.personalRating.toFixed(1)}</span>
            )}
          </div>
          
          <div className="status-select">
            <label>Reading Status:</label>
            <select value={book.status} onChange={handleStatusChange}>
              <option value="TO_BE_READ">To Be Read</option>
              <option value="CURRENTLY_READING">Currently Reading</option>
              <option value="READ">Read</option>
              <option value="DNF">Did Not Finish</option>
            </select>
          </div>
          
          <div className="tags-section">
            <div className="tags-header">
              <FaTag /> Tags
              <button onClick={() => setShowTagForm(!showTagForm)} className="add-button">
                + Add Tag
              </button>
            </div>
            
            {showTagForm && (
              <form onSubmit={handleAddTag} className="tag-form">
                <input
                  type="text"
                  placeholder="Tag name"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  required
                />
                <input
                  type="color"
                  value={tagColor}
                  onChange={(e) => setTagColor(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
            )}
            
            <div className="tags-list">
              {book.tags?.map(tag => (
                <span 
                  key={tag.id} 
                  className="tag"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                  <button onClick={() => handleDeleteTag(tag.id)}>×</button>
                </span>
              ))}
            </div>
          </div>
          
          <button onClick={handleDeleteBook} className="delete-book-button">
            <FaTrash /> Remove from Library
          </button>
        </div>
      </div>
      
      <div className="book-content">
        {book.description && (
          <div className="description-section">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        )}
        
        {book.categories && book.categories.length > 0 && (
          <div className="categories-section">
            <h3>Categories</h3>
            <div className="categories-list">
              {book.categories.map((cat, idx) => (
                <span key={idx} className="category">{cat}</span>
              ))}
            </div>
          </div>
        )}
        
        <div className="reviews-section">
          <div className="section-header">
            <h3>My Reviews</h3>
            <button onClick={() => setShowReviewForm(!showReviewForm)} className="add-button">
              + Add Review
            </button>
          </div>
          
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="review-form">
              <div className="rating-input">
                <label>Rating:</label>
                <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Write your review..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                rows="4"
                required
              />
              <div className="form-buttons">
                <button type="submit">Save Review</button>
                <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
              </div>
            </form>
          )}
          
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  {review.rating && (
                    <div className="review-rating">
                      <FaStar /> {review.rating}
                    </div>
                  )}
                  <button onClick={() => handleDeleteReview(review.id)} className="delete-button">
                    <FaTrash />
                  </button>
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="quotes-section">
          <div className="section-header">
            <h3>My Quotes</h3>
            <button onClick={() => setShowQuoteForm(!showQuoteForm)} className="add-button">
              + Add Quote
            </button>
          </div>
          
          {showQuoteForm && (
            <form onSubmit={handleAddQuote} className="quote-form">
              <textarea
                placeholder="Quote text..."
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                rows="3"
                required
              />
              <input
                type="text"
                placeholder="Page number (optional)"
                value={quotePage}
                onChange={(e) => setQuotePage(e.target.value)}
              />
              <textarea
                placeholder="Your notes (optional)"
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                rows="2"
              />
              <div className="form-buttons">
                <button type="submit">Save Quote</button>
                <button type="button" onClick={() => setShowQuoteForm(false)}>Cancel</button>
              </div>
            </form>
          )}
          
          <div className="quotes-list">
            {quotes.map(quote => (
              <div key={quote.id} className="quote-item">
                <FaQuoteLeft className="quote-icon" />
                <div className="quote-content">
                  <p className="quote-text">"{quote.text}"</p>
                  {quote.pageNumber && <p className="quote-page">Page {quote.pageNumber}</p>}
                  {quote.notes && <p className="quote-notes">{quote.notes}</p>}
                </div>
                <button onClick={() => handleDeleteQuote(quote.id)} className="delete-button">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
