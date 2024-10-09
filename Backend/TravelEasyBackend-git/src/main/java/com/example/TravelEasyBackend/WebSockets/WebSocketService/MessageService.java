package com.example.TravelEasyBackend.WebSockets.WebSocketService;

import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels.*;
import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketRepo.ChatHistoryRepo;
import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketRepo.ChatOwnersRepo;
import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketRepo.ChatRoomInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MessageService {
    @Autowired
    ChatOwnersRepo chatOwnersRepo;

    @Autowired
    ChatRoomInfoRepo chatRoomInfoRepo;

    @Autowired
    ChatHistoryRepo chatHistoryRepo;

    public ResponseEntity<ChatOwners> create(ChatCreation chatC){
        try {
            ChatOwners owner = new ChatOwners();
            ChatRoomInfo info = new ChatRoomInfo();
            owner.setUsername(chatC.getUsername());
            ChatOwners updatedOwner = chatOwnersRepo.save(owner);
            owner.setChatId(updatedOwner.getChatId());
            owner.setLocation(chatC.getLocation());
            info.setChatId(updatedOwner.getChatId());
            info.setChatroomTitle(chatC.getChatroomTitle());
            info.setChatroomDesc(chatC.getChatroomDesc());
            info.setLocation(chatC.getLocation());
            chatRoomInfoRepo.save(info);
            return new ResponseEntity<>(owner,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    public List<ChatRoomInfo> allChats() {
        return chatRoomInfoRepo.findAll();
    }

    public boolean checkLocal(String location, int chatId) {
        ChatRoomInfo info = chatRoomInfoRepo.findChatRoomInfoByChatId(chatId);
        String chatLocation =  info.getLocation().toLowerCase();
        location = location.toLowerCase();
        return chatLocation.contains(location);
    }

    public void save(Chat chatMessage) {
        ChatHistory c = new ChatHistory();
        c.setUsername(chatMessage.getUsername());
        c.setChatId(chatMessage.getChat_id());
        c.setLocal(chatMessage.getLocal());
        c.setMsg(chatMessage.getMsg());
        chatHistoryRepo.save(c);
    }

    public List<ChatHistory> chathistory(int id) {
        return chatHistoryRepo.findChatHistoriesByChatId(id);
    }

    public ResponseEntity<List<ChatRoomInfo>> getChats(String username) {
        List<ChatOwners> owners = chatOwnersRepo.findByUsername(username);
        if(owners.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<ChatRoomInfo> infoList  = new ArrayList<>();
        for (ChatOwners owner : owners) {
            chatRoomInfoRepo.findById(owner.getChatId()).ifPresent(infoList::add);
        }
        return new ResponseEntity<>(infoList ,HttpStatus.OK);
    }
}
