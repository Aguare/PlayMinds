package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "user")
public class User implements Serializable{
    @Id
    private String email;
    private String name;
    private String password;
    private String role;
    private int points;
}