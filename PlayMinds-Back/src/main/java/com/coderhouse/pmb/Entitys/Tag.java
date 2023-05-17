package com.coderhouse.pmb.Entitys;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@Data
@Entity
@Table(name = "tag")
public class Tag implements Serializable{

    @Id
    private int id_tag;
    private String name_tag;
    
}
