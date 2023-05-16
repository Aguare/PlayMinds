package com.coderhouse.pmb.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import com.coderhouse.pmb.Enum.TypeGame;

@Data
@Entity
@Table(name = "game")
public class Game implements Serializable {
    @Id
    private String id_game;
    private String name_game;

    @Enumerated(EnumType.STRING)
    private TypeGame type_game;
    private String description;
    private int value_points;

    @ManyToOne
    @JoinColumn(name = "FK_user")
    private User user;
}
