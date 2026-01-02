package com.bookishlab.controller;

import com.bookishlab.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    @Autowired
    private QuizService quizService;
    
    @GetMapping("/questions")
    public ResponseEntity<List<Map<String, Object>>> getQuestions() {
        return ResponseEntity.ok(quizService.getQuizQuestions());
    }
    
    @PostMapping("/recommendations")
    public ResponseEntity<Map<String, Object>> getRecommendations(@RequestBody Map<String, String> answers) {
        Map<Integer, String> processedAnswers = new java.util.HashMap<>();
        answers.forEach((key, value) -> processedAnswers.put(Integer.parseInt(key), value));
        
        return ResponseEntity.ok(quizService.getRecommendations(processedAnswers));
    }
}
