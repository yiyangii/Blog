package com.mercury.BlogSystemMessage.dao;

import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogDirectMessageDao extends JpaRepository<BlogDirectMessage,Long> {
    List<BlogDirectMessage> findByConversationId(Long conversationId);

    List<BlogDirectMessage> findBysenderId(Long userId);

    List<BlogDirectMessage> findByreceiverId(Long userId);
}
