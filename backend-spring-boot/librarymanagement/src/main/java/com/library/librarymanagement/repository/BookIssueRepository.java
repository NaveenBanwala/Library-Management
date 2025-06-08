package com.library.librarymanagement.repository;

import com.library.librarymanagement.model.BookIssue;
import com.library.librarymanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookIssueRepository extends JpaRepository<BookIssue, Long> {
    List<BookIssue> findByUser(User user);
    List<BookIssue> findByUserAndReturned(User user, boolean returned);
} 