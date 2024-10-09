package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ChatCreation {
    private String username;
    private String chatroomTitle;
    private String chatroomDesc;
    private String location;
}
