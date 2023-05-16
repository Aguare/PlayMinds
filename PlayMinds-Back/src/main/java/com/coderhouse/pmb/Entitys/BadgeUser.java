package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

import org.springframework.data.annotation.Id;

@Data
@Entity 
@Table( name = "badge_user")

public class BadgeUser implements Serializable{
    @EmbeddedId
    private BadgeUserKey id;
    private Date date;


    @Embeddable
    public static class BadgeUserKey implements Serializable {
        private int FK_id_badge;
        private String FK_user_email;

    }
}