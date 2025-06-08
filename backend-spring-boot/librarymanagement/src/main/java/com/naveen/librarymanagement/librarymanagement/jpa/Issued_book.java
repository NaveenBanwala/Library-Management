package com.naveen.librarymanagement.librarymanagement.jpa;

import com.naveen.librarymanagement.librarymanagement.Entity.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Issued_book extends JpaRepository<IssuedBook, Integer> {

    List<IssuedBook> findByUser_userId(Long userId);

    List<IssuedBook> findByBook_bookId(Integer bookId);

    List<IssuedBook> findByReturnDateIsNull();

}
