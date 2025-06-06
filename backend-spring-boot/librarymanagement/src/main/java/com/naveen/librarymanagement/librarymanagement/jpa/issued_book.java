package com.naveen.librarymanagement.librarymanagement.jpa;

import com.naveen.librarymanagement.librarymanagement.Entity.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface issued_book extends JpaRepository<IssuedBook,Integer> {
}
