package com.coderhouse.pmb.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;


@Data
@Entity
@Table(name = "comments")
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_comment;
    private String game_id_game;
    private String user_email;
    private String comment;
    private Date date_comment;
}
