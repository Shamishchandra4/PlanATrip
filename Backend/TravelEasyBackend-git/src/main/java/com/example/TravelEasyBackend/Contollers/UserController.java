package com.example.TravelEasyBackend.Contollers;

import com.example.TravelEasyBackend.Models.UserProfile;
import com.example.TravelEasyBackend.Models.UserReturnModel;
import com.example.TravelEasyBackend.Security.SecurityModels.User;
import com.example.TravelEasyBackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.TravelEasyBackend.Security.Service.jwtService;
@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private jwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return service.saveUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<UserReturnModel> login(@RequestBody User user){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        if(authentication.isAuthenticated()){
            UserReturnModel u = service.constructProfile(jwtService.generateToken(user.getUsername()),user);
            if(u.getUsername()!=null)
                return new ResponseEntity<>(u , HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        else
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("profile")
    public ResponseEntity<UserProfile> profile(@RequestBody UserProfile userProfile){
        return service.saveUserProfile(userProfile);
    }

    @GetMapping("dummy")
    public String dummy(){
        return "hi";
    }
}
