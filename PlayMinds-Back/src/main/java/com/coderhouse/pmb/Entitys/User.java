package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import com.coderhouse.pmb.Enum.Role;

@Data
@Entity
@Table(name = "user")
public class User implements Serializable{

    @Id
    private String email;
    private String name;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private int points;
}