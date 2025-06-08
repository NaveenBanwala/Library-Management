package com.library.librarymanagement.controller;

import com.library.librarymanagement.model.BookIssue;
import com.library.librarymanagement.service.BookIssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class BookIssueController {

    private final BookIssueService bookIssueService;

    public BookIssueController(BookIssueService bookIssueService) {
        this.bookIssueService = bookIssueService;
    }

    @PostMapping("/issue")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public ResponseEntity<BookIssue> issueBook(@RequestBody Map<String, Object> request) {
        Long userId = Long.parseLong(request.get("userId").toString());
        Long bookId = Long.parseLong(request.get("bookId").toString());
        int daysToReturn = Integer.parseInt(request.get("daysToReturn").toString());
        
        return ResponseEntity.ok(bookIssueService.issueBook(userId, bookId, daysToReturn));
    }

    @PostMapping("/return/{issueId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public ResponseEntity<BookIssue> returnBook(@PathVariable Long issueId) {
        return ResponseEntity.ok(bookIssueService.returnBook(issueId));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<BookIssue>> getUserIssuedBooks(@PathVariable String username) {
        return ResponseEntity.ok(bookIssueService.getUserIssuedBooks(username));
    }

    @GetMapping("/user/{username}/active")
    public ResponseEntity<List<BookIssue>> getUserActiveIssues(@PathVariable String username) {
        return ResponseEntity.ok(bookIssueService.getUserActiveIssues(username));
    }
} 