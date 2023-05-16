package com.coderhouse.pmb.Controllers;


import com.coderhouse.pmb.DAO.UserDAO;
import com.coderhouse.pmb.Entitys.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/Users")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class UserCTRL {


    @Autowired
    private UserDAO user;


    @GetMapping("/GetUser")
    public User getUser(String email) {
        Optional<User> userReceipt = this.user.findById(email);
        return userReceipt.orElse(null);
    }


    @GetMapping("/GetAllUsers")
    public Iterable<User> getAllUser() {
        return user.findAll();
    }

    @GetMapping("/GetUserByPoints")
    public Iterable<User> getUserByPoints() {
        return user.findAllByOrderByPointsDesc();
    }

    @PostMapping("/RegisterUser")
    public User saveUser(@RequestBody User user) {
        User userReceipt = this.user.save(user);
        if (this.user.findById(userReceipt.getEmail()).isPresent()) {
            return userReceipt;
        } else {
            return null;
        }
    }

    @DeleteMapping("/DeleteUser")
    public void deleteUser(String email) {
        this.user.deleteById(email);
    }
}