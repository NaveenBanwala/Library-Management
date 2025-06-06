package com.naveen.librarymanagement.librarymanagement.Entity;

import jakarta.persistence.*;

import java.security.Timestamp;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "waitlist")
public class Waitlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer waitlistId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName ="book_id" )
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="book_id",referencedColumnName = "book_id")
    private Book bookId;
    private Timestamp requestDate;

    // Default constructor
    public Waitlist() {}

    // Parameterized constructor
    public Waitlist(User userId, Book bookId, Timestamp requestDate) {
        this.userId = userId;
        this.bookId = bookId;
        this.requestDate = requestDate;
    }

    // Getters and Setters
}
