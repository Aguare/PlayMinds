package com.coderhouse.pmb.Entitys;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "notification")
public class Notification implements Serializable {
    @Id
    @Column(name = "id_notification")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private boolean viewed;
    private String redirect;

    @Column(name = "FK_email")
    private String user;
}
