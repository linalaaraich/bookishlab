import React, { useState, useEffect } from 'react';
import { quizService, bookService } from '../services/api';
import BookCard from '../components/BookCard';
import '../styles/Quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadQuestions();
  }, []);
  
  const loadQuestions = async () => {
    try {
      const response = await quizService.getQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };
  
  const handleAnswer = (answer) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };
  
  const submitQuiz = async (finalAnswers) => {
    setLoading(true);
    try {
      const response = await quizService.getRecommendations(finalAnswers);
      setRecommendations(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations(null);
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
  
  if (loading) {
    return (
      <div className="quiz-page">
        <div className="loading">Finding your perfect books...</div>
      </div>
    );
  }
  
  if (showResults && recommendations) {
    return (
      <div className="quiz-page">
        <header className="page-header">
          <h1>Your Recommendations</h1>
          <p>{recommendations.explanation}</p>
        </header>
        
        <div className="books-grid">
          {recommendations.books.map((book, index) => (
            <BookCard 
              key={book.googleBooksId || index} 
              book={book}
              onAddToLibrary={handleAddToLibrary}
            />
          ))}
        </div>
        
        <div className="quiz-actions">
          <button onClick={restartQuiz} className="restart-button">
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }
  
  const question = questions[currentQuestion];
  
  return (
    <div className="quiz-page">
      <header className="page-header">
        <h1>Book Recommendation Quiz</h1>
        <p>Answer these questions to find your perfect next read</p>
      </header>
      
      <div className="quiz-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        
        <div className="question-card">
          <h2>{question.question}</h2>
          
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
