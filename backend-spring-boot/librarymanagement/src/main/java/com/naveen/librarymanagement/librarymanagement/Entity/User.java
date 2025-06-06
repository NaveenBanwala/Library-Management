package com.naveen.librarymanagement.librarymanagement.Entity;

import jakarta.persistence.*;

import java.security.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long userId;

    private String username;
    private String email;
    private String password;
    private String role;
    private Timestamp createdAt;

    public User(){ }

    public User(String username, String email, String password, String role ,Timestamp createdAt) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt=createdAt;

    }


}
