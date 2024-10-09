package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketRepo;

import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepo extends JpaRepository<ChatHistory, Integer> {
    public List<ChatHistory> findChatHistoriesByChatId(int chatId);
}
