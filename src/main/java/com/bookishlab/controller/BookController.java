package com.bookishlab.controller;

import com.bookishlab.model.Book;
import com.bookishlab.model.ReadingStatus;
import com.bookishlab.service.BookService;
import com.bookishlab.service.GoogleBooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    @Autowired
    private BookService bookService;
    
    @Autowired
    private GoogleBooksService googleBooksService;
    
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Book>> getBooksByStatus(@PathVariable ReadingStatus status) {
        return ResponseEntity.ok(bookService.getBooksByStatus(status));
    }
    
    @GetMapping("/search/title")
    public ResponseEntity<List<Book>> searchByTitle(@RequestParam String query) {
        return ResponseEntity.ok(bookService.searchByTitle(query));
    }
    
    @GetMapping("/search/author")
    public ResponseEntity<List<Book>> searchByAuthor(@RequestParam String query) {
        return ResponseEntity.ok(bookService.searchByAuthor(query));
    }
    
    @GetMapping("/search/category")
    public ResponseEntity<List<Book>> searchByCategory(@RequestParam String query) {
        return ResponseEntity.ok(bookService.searchByCategory(query));
    }
    
    @GetMapping("/explore")
    public ResponseEntity<List<Book>> exploreBooks(@RequestParam(required = false) String query) {
        if (query == null || query.isEmpty()) {
            query = "bestseller";
        }
        return ResponseEntity.ok(googleBooksService.searchBooks(query));
    }
    
    @GetMapping("/google/{googleBooksId}")
    public ResponseEntity<Book> getGoogleBook(@PathVariable String googleBooksId) {
        Book book = googleBooksService.getBookById(googleBooksId);
        if (book != null) {
            return ResponseEntity.ok(book);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookService.saveBook(book));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Book> updateBookStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        ReadingStatus status = ReadingStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(bookService.updateBookStatus(id, status));
    }
    
    @PutMapping("/{id}/rating")
    public ResponseEntity<Book> updateBookRating(@PathVariable Long id, @RequestBody Map<String, Double> body) {
        return ResponseEntity.ok(bookService.updateBookRating(id, body.get("rating")));
    }
    
    @PostMapping("/{bookId}/tags")
    public ResponseEntity<Book> addTag(@PathVariable Long bookId, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(bookService.addTagToBook(
            bookId, 
            body.get("name"), 
            body.getOrDefault("color", "#3B82F6")
        ));
    }
    
    @DeleteMapping("/{bookId}/tags/{tagId}")
    public ResponseEntity<Book> removeTag(@PathVariable Long bookId, @PathVariable Long tagId) {
        return ResponseEntity.ok(bookService.removeTagFromBook(bookId, tagId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }
}
