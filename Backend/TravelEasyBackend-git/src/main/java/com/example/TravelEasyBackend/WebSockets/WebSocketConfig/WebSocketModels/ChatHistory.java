package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "ChatHistory")
@Entity
public class ChatHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int chatId;
    private String username;
    private String msg;
    private boolean isLocal;
}
