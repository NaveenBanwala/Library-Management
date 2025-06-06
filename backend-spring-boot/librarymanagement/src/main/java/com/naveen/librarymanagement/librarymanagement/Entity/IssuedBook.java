package com.naveen.librarymanagement.librarymanagement.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import lombok.ToString;


@Entity
@Getter
@Setter
@Table(name = "issued_books")
@ToString
public class IssuedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issueId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName="user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="book_id" ,referencedColumnName = "book_id")
    private Book bookId;

    private Date issueDate;
    private Date dueDate;
    private Date returnDate;

    // Default constructor
    public IssuedBook() {}

    // Parameterized constructor
    public IssuedBook(User userId, Book bookId, Date issueDate, Date dueDate, Date returnDate) {
        this.userId = userId;
        this.bookId = bookId;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }

    // Getters and Setters
}

