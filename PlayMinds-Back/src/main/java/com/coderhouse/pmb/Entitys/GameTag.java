package com.coderhouse.pmb.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "game_tags")
public class GameTag implements Serializable{
    @Id
    private String FK_id_game;
    @Id
    private int FK_id_tag;
}
