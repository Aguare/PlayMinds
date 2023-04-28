package com.coderhouse.Controllers;

import com.coderhouse.DAO.UserDAO;
import com.coderhouse.Entitys.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:300")
public class UserCTRL{

    @Autowired
    private UserDAO user;

    @GetMapping("/GetUser")
    public User getUser(String email){
        Optional<User> userReceipt = this.user.findById(email);
        if (userReceipt.isPresent()){
            return userReceipt.get();
        }else{
            return null;
        }
    }
}