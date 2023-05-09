package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name= "bagde_user")

public class Badge implements Serializable{

    @Id
    private int id_bagde;
    private String name_badge;
}