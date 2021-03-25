package com.eci.ieti.springbootsecureapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.eci.ieti.springbootsecureapi.model.User;
import com.eci.ieti.springbootsecureapi.service.UserService;

import java.util.List;


@RestController
@RequestMapping( "/api/user" )
@CrossOrigin(origins = "http://localhost:3000")
public class UserController
{

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUser(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping("/find")
    public User findUser(@RequestBody User user){
        return userService.findUserByEmailAndPassword(user.getEmail(),user.getPassword());
    }
}
