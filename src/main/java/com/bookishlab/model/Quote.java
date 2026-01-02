package com.bookishlab.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonIgnore
    private Book book;
    
    @Column(length = 2000)
    private String text;
    
    private String pageNumber;
    
    @Column(length = 1000)
    private String notes;
    
    private LocalDateTime createdDate = LocalDateTime.now();
}
