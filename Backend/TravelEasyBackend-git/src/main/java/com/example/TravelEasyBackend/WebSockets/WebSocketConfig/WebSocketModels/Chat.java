package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Chat {
    private String username;
    private String msg;
    private int chat_id;
    private String location;
    private boolean islocal;
    public boolean getLocal(){
        return islocal;
    }
}
