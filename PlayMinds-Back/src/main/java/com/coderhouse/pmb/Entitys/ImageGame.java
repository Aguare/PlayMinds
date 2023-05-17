package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name="image_and_game")
public class ImageGame implements Serializable {
    @Id
    private String FK_id_img;
    @Id
    private String FK_id_game;
}
