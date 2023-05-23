package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @Column(name = "id_card")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCard;
    private String name;
    private String description;
    private boolean correct;

    @ManyToOne
    @JoinColumn(name = "FK_id_img", referencedColumnName = "id_img")
    private Image image;
}
