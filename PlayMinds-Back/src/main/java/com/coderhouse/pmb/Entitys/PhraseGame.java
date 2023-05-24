package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity 
@Table(name="phrase_has_game")
public class PhraseGame implements Serializable{
    @Id
    @Column(name="FK_id_phrase")
    private Long idPhrase;

    @Column(name="FK_id_game")
    private String idGame;
    
}
