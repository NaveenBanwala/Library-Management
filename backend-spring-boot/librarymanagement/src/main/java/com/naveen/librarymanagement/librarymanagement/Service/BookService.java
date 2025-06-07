package com.naveen.librarymanagement.librarymanagement.Service;

import com.naveen.librarymanagement.librarymanagement.jpa.Booksjpa;
import com.naveen.librarymanagement.librarymanagement.Entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private Booksjpa booksJpaRepo;

    public List<Book> getAllBooks() {
        return booksJpaRepo.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return booksJpaRepo.findById(id);
    }

    public Book addBook(Book book) {
        return booksJpaRepo.save(book);
    }

    public void deleteBook(Long id) {
        booksJpaRepo.deleteById(id);
    }


}
