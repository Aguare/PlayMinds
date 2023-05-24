package com.coderhouse.pmb.Controllers;


import com.coderhouse.pmb.DAO.GameCompleteDAO;
import com.coderhouse.pmb.DAO.UserDAO;
import com.coderhouse.pmb.Entitys.GameComplete;
import com.coderhouse.pmb.Entitys.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Users")
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000"} )
public class UserCTRL {

    @Autowired
    private UserDAO user;

    @Autowired
    private GameCompleteDAO gameComplete;

    @PostMapping("/Login")
    public User login(@RequestBody User user) {
        Optional<User> userReceipt = this.user.findById(user.getEmail());
        if (userReceipt.isPresent()) {
            if (userReceipt.get().getPassword().equals(user.getPassword())) {
                return userReceipt.get();
            }
        }
        return null;
    }

    @GetMapping("/GetUser")
    public User getUser(String email) {
        logLogic(email);
        Optional<User> userReceipt = this.user.findById(email);
        return userReceipt.orElse(null);
    }


    @GetMapping("/GetAllUsers")
    public Iterable<User> getAllUser() {
        return user.findAll();
    }

    @GetMapping("/GetUsersRanking")
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

    @GetMapping("/Logout")
    public void logout(String email) {
        logLogic(email);
    }

    private void logLogic(String email){
        List<GameComplete> gameCompleteList = this.gameComplete.findAllByUser(email);
        double points = 0;
        for (GameComplete gc : gameCompleteList) {
            points += gc.getScore();
        }
        Optional<User> userReceipt = this.user.findById(email);
        if (userReceipt.isPresent()) {
            User user = userReceipt.get();
            user.setPoints(Integer.parseInt(String.valueOf(Math.round(points))));
            this.user.save(user);
        }
    }
}