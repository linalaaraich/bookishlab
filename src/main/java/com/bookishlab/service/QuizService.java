package com.bookishlab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class QuizService {
    @Autowired
    private GoogleBooksService googleBooksService;
    
    public List<Map<String, Object>> getQuizQuestions() {
        List<Map<String, Object>> questions = new ArrayList<>();
        
        Map<String, Object> q1 = new HashMap<>();
        q1.put("id", 1);
        q1.put("question", "What's your ideal reading pace?");
        q1.put("options", Arrays.asList("Quick page-turners", "Moderate, steady reads", "Long, immersive epics"));
        questions.add(q1);
        
        Map<String, Object> q2 = new HashMap<>();
        q2.put("id", 2);
        q2.put("question", "Which setting appeals to you most?");
        q2.put("options", Arrays.asList("Fantasy worlds", "Contemporary/modern", "Historical periods", "Futuristic/sci-fi"));
        questions.add(q2);
        
        Map<String, Object> q3 = new HashMap<>();
        q3.put("id", 3);
        q3.put("question", "What kind of protagonist do you prefer?");
        q3.put("options", Arrays.asList("Hero on a quest", "Everyday person", "Anti-hero", "Ensemble cast"));
        questions.add(q3);
        
        Map<String, Object> q4 = new HashMap<>();
        q4.put("id", 4);
        q4.put("question", "How do you like your endings?");
        q4.put("options", Arrays.asList("Happy/hopeful", "Bittersweet", "Open-ended", "Dark/tragic"));
        questions.add(q4);
        
        Map<String, Object> q5 = new HashMap<>();
        q5.put("id", 5);
        q5.put("question", "What's your preferred mood?");
        q5.put("options", Arrays.asList("Light and funny", "Thought-provoking", "Suspenseful", "Emotional"));
        questions.add(q5);
        
        Map<String, Object> q6 = new HashMap<>();
        q6.put("id", 6);
        q6.put("question", "Which genre sounds most appealing?");
        q6.put("options", Arrays.asList("Romance", "Mystery/Thriller", "Fantasy", "Science Fiction", "Literary Fiction", "Horror"));
        questions.add(q6);
        
        return questions;
    }
    
    public Map<String, Object> getRecommendations(Map<Integer, String> answers) {
        String searchQuery = buildSearchQuery(answers);
        
        Map<String, Object> result = new HashMap<>();
        result.put("searchQuery", searchQuery);
        result.put("books", googleBooksService.searchBooks(searchQuery));
        result.put("explanation", generateExplanation(answers));
        
        return result;
    }
    
    private String buildSearchQuery(Map<Integer, String> answers) {
        StringBuilder query = new StringBuilder();
        
        String genre = answers.getOrDefault(6, "fiction");
        query.append(genre);
        
        String setting = answers.get(2);
        if (setting != null) {
            if (setting.contains("Fantasy")) query.append("+fantasy");
            else if (setting.contains("sci-fi")) query.append("+science+fiction");
            else if (setting.contains("Historical")) query.append("+historical");
        }
        
        String mood = answers.get(5);
        if (mood != null) {
            if (mood.contains("funny")) query.append("+humor");
            else if (mood.contains("Suspenseful")) query.append("+thriller");
        }
        
        return query.toString();
    }
    
    private String generateExplanation(Map<Integer, String> answers) {
        StringBuilder explanation = new StringBuilder("Based on your preferences: ");
        
        String pace = answers.get(1);
        if (pace != null) {
            if (pace.contains("Quick")) {
                explanation.append("fast-paced books with gripping plots, ");
            } else if (pace.contains("Long")) {
                explanation.append("epic, immersive novels with rich world-building, ");
            }
        }
        
        String genre = answers.get(6);
        if (genre != null) {
            explanation.append("in the ").append(genre.toLowerCase()).append(" genre, ");
        }
        
        String mood = answers.get(5);
        if (mood != null) {
            explanation.append("with a ").append(mood.toLowerCase()).append(" tone. ");
        }
        
        explanation.append("These recommendations should match your reading style!");
        
        return explanation.toString();
    }
}
