package com.bookishlab.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String name;
    
    private String color;
    
    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();
    
    public Tag(String name, String color) {
        this.name = name;
        this.color = color;
    }
}
