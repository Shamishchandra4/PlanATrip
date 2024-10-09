package com.example.TravelEasyBackend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "user_profiles")
@Entity
public class UserProfile {
    @Id
    private String username;
    private String name;
    private String currentTown;
    private String homeTown;
    private int likes;
    private String nature;
    private String frequency;
}
