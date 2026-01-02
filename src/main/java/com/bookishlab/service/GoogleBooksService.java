package com.bookishlab.service;

import com.bookishlab.model.Book;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleBooksService {
    @Value("${google.books.api.url}")
    private String apiUrl;
    
    @Value("${google.books.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public List<Book> searchBooks(String query) {
        try {
            String url = apiUrl + "?q=" + query + "&maxResults=20";
            if (apiKey != null && !apiKey.isEmpty()) {
                url += "&key=" + apiKey;
            }
            
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            
            List<Book> books = new ArrayList<>();
            JsonNode items = root.get("items");
            
            if (items != null) {
                for (JsonNode item : items) {
                    Book book = parseBookFromJson(item);
                    books.add(book);
                }
            }
            
            return books;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    public Book getBookById(String googleBooksId) {
        try {
            String url = apiUrl + "/" + googleBooksId;
            if (apiKey != null && !apiKey.isEmpty()) {
                url += "?key=" + apiKey;
            }
            
            String response = restTemplate.getForObject(url, String.class);
            JsonNode item = objectMapper.readTree(response);
            
            return parseBookFromJson(item);
        } catch (Exception e) {
            return null;
        }
    }
    
    private Book parseBookFromJson(JsonNode item) {
        Book book = new Book();
        
        book.setGoogleBooksId(item.get("id").asText());
        
        JsonNode volumeInfo = item.get("volumeInfo");
        
        if (volumeInfo.has("title")) {
            book.setTitle(volumeInfo.get("title").asText());
        }
        
        if (volumeInfo.has("subtitle")) {
            book.setSubtitle(volumeInfo.get("subtitle").asText());
        }
        
        if (volumeInfo.has("authors")) {
            List<String> authors = new ArrayList<>();
            volumeInfo.get("authors").forEach(author -> authors.add(author.asText()));
            book.setAuthors(authors);
        }
        
        if (volumeInfo.has("publisher")) {
            book.setPublisher(volumeInfo.get("publisher").asText());
        }
        
        if (volumeInfo.has("publishedDate")) {
            book.setPublishedDate(volumeInfo.get("publishedDate").asText());
        }
        
        if (volumeInfo.has("description")) {
            book.setDescription(volumeInfo.get("description").asText());
        }
        
        if (volumeInfo.has("categories")) {
            List<String> categories = new ArrayList<>();
            volumeInfo.get("categories").forEach(cat -> categories.add(cat.asText()));
            book.setCategories(categories);
        }
        
        if (volumeInfo.has("imageLinks")) {
            JsonNode imageLinks = volumeInfo.get("imageLinks");
            if (imageLinks.has("thumbnail")) {
                book.setImageUrl(imageLinks.get("thumbnail").asText());
            }
            if (imageLinks.has("smallThumbnail")) {
                book.setSmallImageUrl(imageLinks.get("smallThumbnail").asText());
            }
        }
        
        if (volumeInfo.has("pageCount")) {
            book.setPageCount(volumeInfo.get("pageCount").asInt());
        }
        
        if (volumeInfo.has("language")) {
            book.setLanguage(volumeInfo.get("language").asText());
        }
        
        if (volumeInfo.has("industryIdentifiers")) {
            JsonNode identifiers = volumeInfo.get("industryIdentifiers");
            for (JsonNode identifier : identifiers) {
                String type = identifier.get("type").asText();
                String value = identifier.get("identifier").asText();
                if ("ISBN_10".equals(type)) {
                    book.setIsbn10(value);
                } else if ("ISBN_13".equals(type)) {
                    book.setIsbn13(value);
                }
            }
        }
        
        return book;
    }
}
