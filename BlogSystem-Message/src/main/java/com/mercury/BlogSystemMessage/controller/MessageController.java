package com.mercury.BlogSystemMessage.controller;

import com.mercury.BlogSystemMessage.bean.BlogConversation;
import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import com.mercury.BlogSystemMessage.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/conversation/{id}")
    public ResponseEntity<List<BlogDirectMessage>> getMessagesByConversationId(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.getMessagesByConversationId(id));
    }

    @PostMapping("/conversation")
    public ResponseEntity<BlogConversation> getOrCreateConversation(@RequestBody BlogConversation blogConversation) {
        return ResponseEntity.ok(messageService.getOrCreateConversation(blogConversation));
    }

    @PostMapping("/send")
    public ResponseEntity<BlogDirectMessage> sendMessage(@RequestParam Long conversationId, @RequestParam Long senderId, @RequestParam Long receiverId, @RequestParam String content) {
        BlogDirectMessage message = messageService.sendMessage(conversationId, senderId, receiverId, content);
        if (message != null) {
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/message/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        if (messageService.deleteMessage(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/conversation/{id}")
    public ResponseEntity<Void> deleteConversation(@PathVariable Long id) {
        if (messageService.deleteConversation(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
