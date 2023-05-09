package com.coderhouse.Controllers;

import com.coderhouse.DAO.UserDAO;
import com.coderhouse.Entitys.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class UserCTRL{

    @Autowired
    private UserDAO user;

    /**
     * @return
     */
    @GetMapping("/GetUser")
    public User getUser(String email){
        Optional<User> userReceipt = this.user.findById(email);
        if (userReceipt.isPresent()){
            return userReceipt.get();
        }else{
            return null;
        }
    }
    /**
     * @return
     */
    @GetMapping("/GetAll")
    public Iterable<User> getAllUser(){
         Iterable<User> usersReceipt= this.user.findAll();
         Iterator<User> iterator = usersReceipt.iterator();
            if (iterator.hasNext()) {
                return usersReceipt;
            } else {
                return null;
            }     
    }
    
    /**
     * @return
     */
    @GetMapping("/SaveUser")
    public User saveUser(User user){
        User userReceipt= this.user.save(user);
        if(this.user.findById(userReceipt.getEmail()).isPresent()){
            return userReceipt;
        }else{
            return null;
        }
    }
    /**
     * @return
     */
    @GetMapping("/DeleteUser")
    public void deleteUser(String email){
        this.user.deleteById(email);
    }
}