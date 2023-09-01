package com.mercury.BlogSystemMessage.dao;

import com.mercury.BlogSystemMessage.bean.BlogConversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogConversationDao extends JpaRepository<BlogConversation,Long> {
}
