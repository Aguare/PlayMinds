package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

@Data
@Entity
@Table(name = "question")
public class Question implements Serializable {
    @Id
    private int id_question;
    private String question;
}
