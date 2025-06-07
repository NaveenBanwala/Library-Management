package com.naveen.librarymanagement.librarymanagement.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Reviews extends JpaRepository<Reviews,Integer> {

}
