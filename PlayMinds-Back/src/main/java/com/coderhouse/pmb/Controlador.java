package com.coderhouse.pmb;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/register")
public class Controlador {

    @PostMapping("/new_register")
    public void recibirDatos(@RequestBody String datos){
        System.out.println("Datos recibidos: " +datos);
    }
    
}
