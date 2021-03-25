package com.eci.ieti.springbootsecureapi.service;

import java.util.List;

import com.eci.ieti.springbootsecureapi.model.User;

/**
 * @author Santiago Carrillo
 * 8/21/17.
 */
public interface UserService
{
    List<User> getUsers();

    User getUser( String username );

    User getUser( Long id );
    
    User createUser( User user );

    User findUserByEmail( String email );

    User findUserByEmailAndPassword( String email, String password );
}