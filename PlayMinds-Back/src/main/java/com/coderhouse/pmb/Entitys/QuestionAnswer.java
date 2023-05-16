package com.coderhouse.pmb.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "question_and_answer")
public class QuestionAnswer implements Serializable {

    @Column(name = "FK_QA_id_question")
    private Long question;

    @Id
    @Column(name = "FK_QA_id_answer")
    private Long answer;

}
