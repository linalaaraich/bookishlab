package com.bookishlab.controller;

import com.bookishlab.model.Quote;
import com.bookishlab.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "*")
public class QuoteController {
    @Autowired
    private QuoteService quoteService;
    
    @GetMapping
    public ResponseEntity<List<Quote>> getAllQuotes() {
        return ResponseEntity.ok(quoteService.getAllQuotes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Quote> getQuoteById(@PathVariable Long id) {
        return quoteService.getQuoteById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Quote>> getQuotesByBookId(@PathVariable Long bookId) {
        return ResponseEntity.ok(quoteService.getQuotesByBookId(bookId));
    }
    
    @PostMapping
    public ResponseEntity<Quote> createQuote(@RequestBody Map<String, Object> body) {
        Long bookId = Long.valueOf(body.get("bookId").toString());
        String text = (String) body.get("text");
        String pageNumber = (String) body.get("pageNumber");
        String notes = (String) body.get("notes");
        
        return ResponseEntity.ok(quoteService.createQuote(bookId, text, pageNumber, notes));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Quote> updateQuote(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        String text = (String) body.get("text");
        String pageNumber = (String) body.get("pageNumber");
        String notes = (String) body.get("notes");
        
        return ResponseEntity.ok(quoteService.updateQuote(id, text, pageNumber, notes));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long id) {
        quoteService.deleteQuote(id);
        return ResponseEntity.ok().build();
    }
}
