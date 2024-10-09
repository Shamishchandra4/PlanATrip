package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketRepo;

import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels.ChatOwners;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatOwnersRepo extends JpaRepository<ChatOwners, Integer> {
    public List<ChatOwners> findByUsername(String username);
}
