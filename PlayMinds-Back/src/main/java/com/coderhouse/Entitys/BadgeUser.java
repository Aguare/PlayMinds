package com.coderhouse.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

import org.springframework.data.annotation.Id;

@Data
@Entity 
@Table( name = "badge_user")

public class BadgeUser implements Serializable{
    @Id
    private int FK_id_badge;
    @Id
    private String FK_user_email;
    private Date date;
    
    
}