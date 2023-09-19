package com.mercury.BlogSystemMessage.dao;

import com.mercury.BlogSystemMessage.bean.BlogConversation;
import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogConversationDao extends JpaRepository<BlogConversation,Long> {
    BlogConversation findByUser1IdAndUser2Id(Long user1Id, Long user2Id);


    void deleteByuser1Id(Long userId);

    void deleteByuser2Id(Long userId);
}
