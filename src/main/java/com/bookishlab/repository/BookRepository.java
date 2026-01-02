package com.bookishlab.repository;

import com.bookishlab.model.Book;
import com.bookishlab.model.ReadingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByStatus(ReadingStatus status);
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorsContainingIgnoreCase(String author);
    Optional<Book> findByGoogleBooksId(String googleBooksId);
    List<Book> findByCategoriesContainingIgnoreCase(String category);
}
