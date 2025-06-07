package com.naveen.librarymanagement.librarymanagement.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Waitlist extends JpaRepository<com.naveen.librarymanagement.librarymanagement.Entity.Waitlist,Integer> {

}
