package com.example.TravelEasyBackend.WebSockets.WebSocketControllers;

import com.example.TravelEasyBackend.WebSockets.WebSocketConfig.WebSocketModels.*;
import com.example.TravelEasyBackend.WebSockets.WebSocketService.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("create-chat")
    public ResponseEntity<ChatOwners> create(@RequestBody ChatCreation chatCreation){
        return messageService.create(chatCreation);
    }

    @GetMapping("my-chats/{username}")
    public ResponseEntity<List<ChatRoomInfo>> create(@PathVariable String username){
        return messageService.getChats(username);
    }

    @GetMapping("all-chats")
    public List<ChatRoomInfo> allChats(){
        return messageService.allChats();
    }

 //will integrate later
//    @MessageMapping("/chat.SendMessage")
//    public void sendMessage(@Payload Chat chatMessage) {
//        // Assume chatMessage has a method getChatRoomId() to get the room ID
//        int chatRoomId = chatMessage.getChat_id();
//        chatMessage.setIslocal(messageService.checkLocal(chatMessage.getLocation(),chatMessage.getChat_id()));
//        messageService.save(chatMessage);
//        // Construct the destination dynamically
//        String destination = "/topic/public/" + chatRoomId;
//        // Optionally save the message to the database here
//
//        // Send the message to the dynamically constructed destination
//        messagingTemplate.convertAndSend(destination, chatMessage);
//    }

    @PostMapping("/chat.SendMessage/{id}")
    public void sendMessage(@RequestBody Chat chatMessage, @PathVariable int id) {
        int chatRoomId = chatMessage.getChat_id();
        chatMessage.setIslocal(messageService.checkLocal(chatMessage.getLocation(),chatMessage.getChat_id()));
        messageService.save(chatMessage);
    }

    @GetMapping("chats/{id}")
    public List<ChatHistory> getChat(@PathVariable int id){
        return messageService.chathistory(id);
    }
}
