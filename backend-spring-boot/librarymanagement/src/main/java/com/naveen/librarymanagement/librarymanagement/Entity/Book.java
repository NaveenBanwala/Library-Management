package com.naveen.librarymanagement.librarymanagement.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Entity
@Table(name = "books")
@Getter
@Setter
@ToString
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer bookId;

    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private Integer totalCopies;
    private Integer availableCopies;
    private String pdfPath;

    private Timestamp createdAt;

    public Book() {}

    public Book(String title, String author, String publisher, String isbn, Integer totalCopies, Integer availableCopies, String pdfPath, Timestamp createdAt) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.isbn = isbn;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
        this.pdfPath = pdfPath;
        this.createdAt = createdAt;
    }
}


