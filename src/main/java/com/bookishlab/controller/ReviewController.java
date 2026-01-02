package com.bookishlab.controller;

import com.bookishlab.model.Review;
import com.bookishlab.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBookId(@PathVariable Long bookId) {
        return ResponseEntity.ok(reviewService.getReviewsByBookId(bookId));
    }
    
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String, Object> body) {
        Long bookId = Long.valueOf(body.get("bookId").toString());
        String content = (String) body.get("content");
        Double rating = body.get("rating") != null ? Double.valueOf(body.get("rating").toString()) : null;
        
        return ResponseEntity.ok(reviewService.createReview(bookId, content, rating));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        String content = (String) body.get("content");
        Double rating = body.get("rating") != null ? Double.valueOf(body.get("rating").toString()) : null;
        
        return ResponseEntity.ok(reviewService.updateReview(id, content, rating));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }
}
