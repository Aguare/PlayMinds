package com.coderhouse.pmb.Entitys;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "card_has_game")
public class CardGame {
    @Id
    @Column(name = "FK_id_card")
    private Long idCard;

    @Column(name = "FK_id_game")
    private String idGame;
}
