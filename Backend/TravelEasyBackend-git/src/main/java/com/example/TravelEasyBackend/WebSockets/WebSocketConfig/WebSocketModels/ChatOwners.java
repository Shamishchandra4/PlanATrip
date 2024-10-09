package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "ChatOwners")
@Entity
public class ChatOwners {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;
    private String username;
    private String location;
}
