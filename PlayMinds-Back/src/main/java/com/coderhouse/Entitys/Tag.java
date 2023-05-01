package com.coderhouse.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

@Data
@Entity
@Table(name = "tag")
public class Tag implements Serializable{
    @Id
    private int id_tag;
    private String name_tag;
    
}
