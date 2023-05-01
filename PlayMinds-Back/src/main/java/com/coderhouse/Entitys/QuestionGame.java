package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

@Data
@Entity
@Table(name = "question_and_game")
public class QuestionGame implements Serializable {
    @Id
    private int FKid_question;
    @Id
    private String FK_id_game;
}
