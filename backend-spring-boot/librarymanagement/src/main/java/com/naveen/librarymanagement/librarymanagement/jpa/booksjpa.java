package com.naveen.librarymanagement.librarymanagement.jpa;

import com.naveen.librarymanagement.librarymanagement.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface booksjpa extends JpaRepository<Book,Integer> {

}
