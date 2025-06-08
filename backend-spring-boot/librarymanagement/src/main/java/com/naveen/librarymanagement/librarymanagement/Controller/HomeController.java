package com.naveen.librarymanagement.librarymanagement.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Library Management System!";
    }

    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }
} 