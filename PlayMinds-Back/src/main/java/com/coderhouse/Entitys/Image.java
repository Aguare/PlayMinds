package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

@Data
@Entity
@Table(name ="image")
public class Image implements Serializable {
    @Id
    private String id_img;
    private String path_img;
    /* este se agrega en la base de datos tambien
    *private Boolean show;*
    */
}
