package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name ="image")
public class Image implements Serializable {
    @Id
    private String id_img;
    private String path_img;
    private boolean show;
}
