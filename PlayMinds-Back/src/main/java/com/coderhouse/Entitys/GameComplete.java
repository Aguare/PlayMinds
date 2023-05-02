package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

import org.springframework.data.annotation.Id;


@Data
@Entity
@Table(name= "game_complete")
public class GameComplete implements Serializable{
    @Id
    private String FK_UG_user_email;
    private String FK_UG_id_game;
    private Date date;

}
