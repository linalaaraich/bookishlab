package com.bookishlab.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String googleBooksId;
    private String title;
    private String subtitle;
    
    @ElementCollection
    private List<String> authors = new ArrayList<>();
    
    private String publisher;
    private String publishedDate;
    private String description;
    
    @ElementCollection
    private List<String> categories = new ArrayList<>();
    
    private String imageUrl;
    private String smallImageUrl;
    private Integer pageCount;
    private String language;
    private String isbn10;
    private String isbn13;
    
    @Enumerated(EnumType.STRING)
    private ReadingStatus status = ReadingStatus.TO_BE_READ;
    
    private Double personalRating;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "book_tags",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
    
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
    
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quote> quotes = new ArrayList<>();
    
    private LocalDateTime addedDate = LocalDateTime.now();
    private LocalDateTime startedDate;
    private LocalDateTime finishedDate;
}
