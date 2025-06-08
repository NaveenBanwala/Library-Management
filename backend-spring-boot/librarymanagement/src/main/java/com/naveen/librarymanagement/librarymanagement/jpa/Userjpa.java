package com.naveen.librarymanagement.librarymanagement.jpa;

import com.naveen.librarymanagement.librarymanagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Userjpa extends JpaRepository<User, Long> {

}
