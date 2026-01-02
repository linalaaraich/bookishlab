package com.bookishlab.service;

import com.bookishlab.model.Book;
import com.bookishlab.model.ReadingStatus;
import com.bookishlab.model.Tag;
import com.bookishlab.repository.BookRepository;
import com.bookishlab.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    
    @Autowired
    private TagRepository tagRepository;
    
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
    
    public List<Book> getBooksByStatus(ReadingStatus status) {
        return bookRepository.findByStatus(status);
    }
    
    public List<Book> searchByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Book> searchByAuthor(String author) {
        return bookRepository.findByAuthorsContainingIgnoreCase(author);
    }
    
    public List<Book> searchByCategory(String category) {
        return bookRepository.findByCategoriesContainingIgnoreCase(category);
    }
    
    @Transactional
    public Book saveBook(Book book) {
        if (book.getGoogleBooksId() != null) {
            Optional<Book> existing = bookRepository.findByGoogleBooksId(book.getGoogleBooksId());
            if (existing.isPresent()) {
                return existing.get();
            }
        }
        return bookRepository.save(book);
    }
    
    @Transactional
    public Book updateBookStatus(Long id, ReadingStatus status) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        book.setStatus(status);
        
        if (status == ReadingStatus.CURRENTLY_READING && book.getStartedDate() == null) {
            book.setStartedDate(LocalDateTime.now());
        } else if (status == ReadingStatus.READ && book.getFinishedDate() == null) {
            book.setFinishedDate(LocalDateTime.now());
        }
        
        return bookRepository.save(book);
    }
    
    @Transactional
    public Book updateBookRating(Long id, Double rating) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        book.setPersonalRating(rating);
        return bookRepository.save(book);
    }
    
    @Transactional
    public Book addTagToBook(Long bookId, String tagName, String tagColor) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        
        Tag tag = tagRepository.findByName(tagName)
            .orElseGet(() -> tagRepository.save(new Tag(tagName, tagColor)));
        
        book.getTags().add(tag);
        return bookRepository.save(book);
    }
    
    @Transactional
    public Book removeTagFromBook(Long bookId, Long tagId) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book not found"));
        book.getTags().removeIf(tag -> tag.getId().equals(tagId));
        return bookRepository.save(book);
    }
    
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
