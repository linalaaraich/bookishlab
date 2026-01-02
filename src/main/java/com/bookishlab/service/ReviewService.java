package com.bookishlab.service;

import com.bookishlab.model.Book;
import com.bookishlab.model.Review;
import com.bookishlab.repository.BookRepository;
import com.bookishlab.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }
    
    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }
    
    @Transactional
    public Review createReview(Long bookId, String content, Double rating) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        
        Review review = new Review();
        review.setBook(book);
        review.setContent(content);
        review.setRating(rating);
        review.setCreatedDate(LocalDateTime.now());
        review.setUpdatedDate(LocalDateTime.now());
        
        return reviewRepository.save(review);
    }
    
    @Transactional
    public Review updateReview(Long id, String content, Double rating) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found"));
        
        review.setContent(content);
        review.setRating(rating);
        review.setUpdatedDate(LocalDateTime.now());
        
        return reviewRepository.save(review);
    }
    
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
