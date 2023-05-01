package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import Enum.TypeGame;
public class Game implements Serializable {
    @Id
    private String id_game;
    private String name_game;
    private TypeGame type_game;
    private String description;
    private int value_points;
    private String FK_user;
    
}
