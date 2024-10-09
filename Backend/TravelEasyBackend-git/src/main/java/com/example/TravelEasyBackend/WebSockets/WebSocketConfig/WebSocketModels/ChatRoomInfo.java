package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "ChatRoomInfo")
@Entity
public class ChatRoomInfo {
    @Id
    private int chatId;
    private String chatroomTitle;
    private String chatroomDesc;
    private String location;
    private int likes;

}
