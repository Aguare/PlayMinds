package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "question_and_asnwer")
public class QuestionAnswer implements Serializable {
    @Id
    private int FK_QA_id_question;
    @Id
    private int FK_QA_id_answer;

}
