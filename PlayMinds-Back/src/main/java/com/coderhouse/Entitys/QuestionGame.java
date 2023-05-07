package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "question_and_game")
public class QuestionGame implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "FK_id_question")
    private Question question;

    @Id
    private String FK_id_game;
}
