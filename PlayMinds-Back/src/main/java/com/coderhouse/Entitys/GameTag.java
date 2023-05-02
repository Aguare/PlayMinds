package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

@Data
@Entity
@Table(name = "game_tags")
public class GameTag implements Serializable{
    @Id
    private String FK_id_game;
    @Id
    private int FK_id_tag;
}
