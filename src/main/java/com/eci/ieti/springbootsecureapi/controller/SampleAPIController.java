package com.eci.ieti.springbootsecureapi.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SampleAPIController
{

    @GetMapping( "/api/test" )
    public String getTestMessage()
    {
        return "Test Message!!";
    }
}
