import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBooks from './pages/MyBooks';
import Explore from './pages/Explore';
import Quiz from './pages/Quiz';
import BookDetail from './pages/BookDetail';
import './styles/App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
