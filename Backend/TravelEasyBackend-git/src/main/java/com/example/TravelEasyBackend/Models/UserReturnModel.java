package com.example.TravelEasyBackend.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserReturnModel {
    private String username;
    private String name;
    private String currentTown;
    private String homeTown;
    private int likes;
    private String nature;
    private String frequency;
    private String jwt;
    public UserReturnModel(UserProfile u){
        username = u.getUsername();
        name = u.getName();
        currentTown = u.getCurrentTown();
        homeTown = u.getHomeTown();
        likes = u.getLikes();
        nature = u.getNature();
        frequency = u.getFrequency();
    }
}
