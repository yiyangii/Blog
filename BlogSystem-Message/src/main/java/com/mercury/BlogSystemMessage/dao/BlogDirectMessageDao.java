package com.mercury.BlogSystemMessage.dao;

import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogDirectMessageDao extends JpaRepository<BlogDirectMessage,Long> {
}
