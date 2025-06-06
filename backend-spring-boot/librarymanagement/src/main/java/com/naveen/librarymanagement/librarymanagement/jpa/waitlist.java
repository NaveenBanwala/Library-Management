package com.naveen.librarymanagement.librarymanagement.jpa;

import com.naveen.librarymanagement.librarymanagement.Entity.Waitlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface waitlist extends JpaRepository<Waitlist,Integer> {

}
