package com.mdw.spring.gestion_cafeteria.springboot_aplications.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EjemploController 
{
    @GetMapping("/html/index")
    public String info(){
        return "html/index";
    }
}
