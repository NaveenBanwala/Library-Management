package com.naveen.librarymanagement.librarymanagement.jpa;

import com.naveen.librarymanagement.librarymanagement.Entity.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Issued_book extends JpaRepository<IssuedBook, Long> {

    List<IssuedBook> findByUserId(Long userId);

    List<IssuedBook> findByBookId(Integer bookId);

    List<IssuedBook> findByReturnDateIsNull();

}
