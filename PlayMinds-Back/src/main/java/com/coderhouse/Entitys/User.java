package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import com.coderhouse.Enum.Role;

@Data
@Entity
@Table(name = "user")
public class User implements Serializable{
    @Id
    private String email;
    private String name;
    private String password;
    private Role role;
    private int points;
}