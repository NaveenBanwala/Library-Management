package com.naveen.librarymanagement.librarymanagement.Service;


import com.naveen.librarymanagement.librarymanagement.Entity.Book;

import com.naveen.librarymanagement.librarymanagement.jpa.Booksjpa;
import com.naveen.librarymanagement.librarymanagement.jpa.Issued_book;
import com.naveen.librarymanagement.librarymanagement.jpa.Userjpa;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.naveen.librarymanagement.librarymanagement.Entity.IssuedBook;


import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

@Service
public class IssuedBookService{

    @Autowired
    private Issued_book issuedBookRepo;

    @Autowired
    private Userjpa userRepo;

    @Autowired
    private Booksjpa bookRepo;

    public IssuedBook issueBook(Long userId, Long bookId, LocalDate dueDate) {
        IssuedBook issuedBook = new IssuedBook();

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        issuedBook.setUser(user);
        issuedBook.setBook(book);
        issuedBook.setIssueDate(LocalDate.now());
        issuedBook.setDueDate(dueDate);
        issuedBook.setReturnDate(null);

        return issuedBookRepo.save(issuedBook);
    }

    public Optional<IssuedBook> getIssuedBookById(Long id) {
        return issuedBookRepo.findById(id);
    }

    public List<IssuedBook> getAllIssuedBooks() {
        return issuedBookRepo.findAll();
    }

    public List<IssuedBook> getIssuedBooksByUser(Long userId) {
        return issuedBookRepo.findByUserId(userId);
    }

    public List<IssuedBook> getIssuedBooksByBook(Integer bookId) {
        return issuedBookRepo.findByBookId(bookId);
    }

    public List<IssuedBook> getCurrentlyIssuedBooks() {
        return issuedBookRepo.findByReturnDateIsNull();
    }



}
