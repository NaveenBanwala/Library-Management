package com.naveen.librarymanagement.librarymanagement.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;


@Repository
public interface userjpa extends JpaRepository<User, Long> {

}
