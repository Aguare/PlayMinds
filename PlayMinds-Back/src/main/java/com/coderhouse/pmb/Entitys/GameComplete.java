package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;



@Data
@Entity
@Table(name= "game_complete")
public class GameComplete implements Serializable{

    @Id
    @Column(name = "id_gc")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FK_UG_user_email")
    private String user;

    @Column(name = "Fk_UG_id_game")
    private String game;

    @Column(name = "date_UG")
    private Date date;
    private Double score;

}
