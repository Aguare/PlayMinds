package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
@Data
@Entity
@Table(name ="phase")
public class Phase  implements Serializable{
    @Id
    private int id_phase;
    private String phase;
}
