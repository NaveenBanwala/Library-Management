package com.naveen.librarymanagement.librarymanagement.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "issued_books")
@Getter
@Setter
@ToString
public class IssuedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer issueId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    private LocalDate dueDate;

    private Date returnDate;

    public IssuedBook() {}

    public IssuedBook(User user, Book book, LocalDate issueDate, LocalDate dueDate, Date returnDate) {
        this.user = user;
        this.book = book;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }
}


