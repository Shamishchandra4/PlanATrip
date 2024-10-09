package com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketRepo;

import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels.ChatOwners;
import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels.ChatRoomInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomInfoRepo extends JpaRepository<ChatRoomInfo, Integer> {
    public ChatRoomInfo findChatRoomInfoByChatId(int chatId);
}
