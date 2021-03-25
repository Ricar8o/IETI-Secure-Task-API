package com.eci.ieti.springbootsecureapi.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.ServletException;

import com.eci.ieti.springbootsecureapi.model.User;
import com.eci.ieti.springbootsecureapi.service.UserService;

import java.util.Date;

/**
 * @author Santiago Carrillo
 * 8/21/17.
 */
@RestController
@RequestMapping( "/user" )
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController
{

    @Autowired
    private UserService userService;

    @RequestMapping( value = "/login", method = RequestMethod.POST )
    public ResponseEntity<?>  login( @RequestBody User login )
    {   
        try{
            String jwtToken = "";

            if ( login.getUsername() == null || login.getPassword() == null )
            {
                throw new ServletException( "Please fill in username and password" );
            }

            String username = login.getUsername();
            String password = login.getPassword();

            
            User user = userService.getUser( username );

            if ( user == null )
            {
                throw new ServletException( "User " + username + " not found." );
            }

            String pwd = user.getPassword();

            if ( !password.equals( pwd ) )
            {
                throw new ServletException( "Invalid login. Please check your name and password." );
            }

            //
            jwtToken = Jwts.builder().setSubject( username ).claim( "roles", "user" ).setIssuedAt( new Date() ).signWith(
                SignatureAlgorithm.HS256, "secretkey" ).compact();

            return new ResponseEntity<>(new Token( jwtToken ), HttpStatus.ACCEPTED);
        }catch(ServletException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    public class Token
    {

        String accessToken;


        public Token( String accessToken )
        {
            this.accessToken = accessToken;
        }


        public String getAccessToken()
        {
            return accessToken;
        }

        public void setAccessToken( String access_token )
        {
            this.accessToken = access_token;
        }
    }

}
