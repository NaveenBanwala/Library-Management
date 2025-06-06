package com.naveen.librarymanagement.librarymanagement.Entity;


import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
    @Table(name = "reviews")
    public class Review {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer reviewId;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="user_id" , referencedColumnName = "user_id")
        private User userId;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="book_id" , referencedColumnName = "book_id")
        private Book bookId;

        private Integer rating;
        private String comment;
        private Timestamp createdAt;

        // Default constructor
        public Review() {}

        // Parameterized constructor
        public Review(User userId, Book bookId, Integer rating, String comment, Timestamp createdAt) {
            this.userId = userId;
            this.bookId = bookId;
            this.rating = rating;
            this.comment = comment;
            this.createdAt = createdAt;
        }

        // Getters and Setters
    }

