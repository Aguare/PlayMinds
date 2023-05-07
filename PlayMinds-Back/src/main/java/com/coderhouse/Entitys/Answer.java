package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "answer")
public class Answer implements Serializable {
    @Id
    private int id_answer;
    private String answer;
    private Boolean isCorrect;
}
