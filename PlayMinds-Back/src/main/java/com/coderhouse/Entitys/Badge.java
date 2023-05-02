package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.EntityGraph;
@Data
@Entity
@Table(name= "bagde_user")

public class Badge implements Serializable{
    @Id
    private int id_bagde;
    private String name_badge;
}