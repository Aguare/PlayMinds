package com.coderhouse.pmb.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "question_and_game")
public class QuestionGame implements Serializable {

    @Id
    @Column(name = "FK_id_question")
    private Long question;

    private String FK_id_game;
}
