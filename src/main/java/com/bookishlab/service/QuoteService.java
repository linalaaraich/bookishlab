package com.bookishlab.service;

import com.bookishlab.model.Book;
import com.bookishlab.model.Quote;
import com.bookishlab.repository.BookRepository;
import com.bookishlab.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuoteService {
    @Autowired
    private QuoteRepository quoteRepository;
    
    @Autowired
    private BookRepository bookRepository;
    
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }
    
    public Optional<Quote> getQuoteById(Long id) {
        return quoteRepository.findById(id);
    }
    
    public List<Quote> getQuotesByBookId(Long bookId) {
        return quoteRepository.findByBookId(bookId);
    }
    
    @Transactional
    public Quote createQuote(Long bookId, String text, String pageNumber, String notes) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        
        Quote quote = new Quote();
        quote.setBook(book);
        quote.setText(text);
        quote.setPageNumber(pageNumber);
        quote.setNotes(notes);
        quote.setCreatedDate(LocalDateTime.now());
        
        return quoteRepository.save(quote);
    }
    
    @Transactional
    public Quote updateQuote(Long id, String text, String pageNumber, String notes) {
        Quote quote = quoteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Quote not found"));
        
        quote.setText(text);
        quote.setPageNumber(pageNumber);
        quote.setNotes(notes);
        
        return quoteRepository.save(quote);
    }
    
    public void deleteQuote(Long id) {
        quoteRepository.deleteById(id);
    }
}
