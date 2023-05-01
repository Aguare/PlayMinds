package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

@Data
@Entity 
@Table(name="phase_has_game")
public class PhaseGame implements Serializable{
    @Id
    private int FK_id_phase;
    @Id
    private String FK_id_game;
    
}
