package com.example.TravelEasyBackend.Security.SecurityModels;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "users")
@Entity
public class User {
    @Id
    private String username;
    private String password;

}
