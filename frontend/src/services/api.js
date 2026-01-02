import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  getAllBooks: () => api.get('/books'),
  getBookById: (id) => api.get(`/books/${id}`),
  getBooksByStatus: (status) => api.get(`/books/status/${status}`),
  searchByTitle: (query) => api.get(`/books/search/title?query=${query}`),
  searchByAuthor: (query) => api.get(`/books/search/author?query=${query}`),
  searchByCategory: (query) => api.get(`/books/search/category?query=${query}`),
  exploreBooks: (query = '') => api.get(`/books/explore?query=${query}`),
  getGoogleBook: (googleBooksId) => api.get(`/books/google/${googleBooksId}`),
  createBook: (book) => api.post('/books', book),
  updateBookStatus: (id, status) => api.put(`/books/${id}/status`, { status }),
  updateBookRating: (id, rating) => api.put(`/books/${id}/rating`, { rating }),
  addTag: (bookId, name, color) => api.post(`/books/${bookId}/tags`, { name, color }),
  removeTag: (bookId, tagId) => api.delete(`/books/${bookId}/tags/${tagId}`),
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export const reviewService = {
  getAllReviews: () => api.get('/reviews'),
  getReviewById: (id) => api.get(`/reviews/${id}`),
  getReviewsByBookId: (bookId) => api.get(`/reviews/book/${bookId}`),
  createReview: (bookId, content, rating) => 
    api.post('/reviews', { bookId, content, rating }),
  updateReview: (id, content, rating) => 
    api.put(`/reviews/${id}`, { content, rating }),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export const quoteService = {
  getAllQuotes: () => api.get('/quotes'),
  getQuoteById: (id) => api.get(`/quotes/${id}`),
  getQuotesByBookId: (bookId) => api.get(`/quotes/book/${bookId}`),
  createQuote: (bookId, text, pageNumber, notes) => 
    api.post('/quotes', { bookId, text, pageNumber, notes }),
  updateQuote: (id, text, pageNumber, notes) => 
    api.put(`/quotes/${id}`, { text, pageNumber, notes }),
  deleteQuote: (id) => api.delete(`/quotes/${id}`),
};

export const quizService = {
  getQuestions: () => api.get('/quiz/questions'),
  getRecommendations: (answers) => api.post('/quiz/recommendations', answers),
};

export default api;
