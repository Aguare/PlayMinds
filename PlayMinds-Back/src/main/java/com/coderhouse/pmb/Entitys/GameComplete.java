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
    @ManyToOne
    @JoinColumn(name = "FK_UG_user_email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Fk_UG_id_game")
    private Game game;

    private Date date;

}
