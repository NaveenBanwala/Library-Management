package com.library.librarymanagement.service;

import com.library.librarymanagement.model.Book;
import com.library.librarymanagement.model.BookIssue;
import com.library.librarymanagement.model.User;
import com.library.librarymanagement.repository.BookIssueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookIssueService {

    private final BookIssueRepository bookIssueRepository;
    private final BookService bookService;
    private final UserService userService;

    public BookIssueService(BookIssueRepository bookIssueRepository, BookService bookService, UserService userService) {
        this.bookIssueRepository = bookIssueRepository;
        this.bookService = bookService;
        this.userService = userService;
    }

    @Transactional
    public BookIssue issueBook(Long userId, Long bookId, int daysToReturn) {
        User user = userService.findByUsername(userId.toString())
            .orElseThrow(() -> new RuntimeException("User not found with username: " + userId));
        Book book = bookService.getBookById(bookId);

        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException("Book is not available for issue");
        }

        // Check if user has any overdue books
        List<BookIssue> activeIssues = bookIssueRepository.findByUserAndReturned(user, false);
        for (BookIssue issue : activeIssues) {
            if (issue.getDueDate().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("User has overdue books. Please return them first.");
            }
        }

        BookIssue bookIssue = new BookIssue();
        bookIssue.setUser(user);
        bookIssue.setBook(book);
        bookIssue.setIssueDate(LocalDateTime.now());
        bookIssue.setDueDate(LocalDateTime.now().plusDays(daysToReturn));
        bookIssue.setReturned(false);

        // Update available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookService.updateBook(book.getBookId(), book);

        return bookIssueRepository.save(bookIssue);
    }

    @Transactional
    public BookIssue returnBook(Long issueId) {
        BookIssue bookIssue = bookIssueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Book issue not found with id: " + issueId));

        if (bookIssue.isReturned()) {
            throw new RuntimeException("Book has already been returned");
        }

        bookIssue.setReturned(true);
        bookIssue.setReturnDate(LocalDateTime.now());

        // Update available copies
        Book book = bookIssue.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookService.updateBook(book.getBookId(), book);

        return bookIssueRepository.save(bookIssue);
    }

    @Transactional(readOnly = true)
    public List<BookIssue> getUserIssuedBooks(String username) {
        User user = userService.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return bookIssueRepository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public List<BookIssue> getUserActiveIssues(String username) {
        User user = userService.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return bookIssueRepository.findByUserAndReturned(user, false);
    }
} 