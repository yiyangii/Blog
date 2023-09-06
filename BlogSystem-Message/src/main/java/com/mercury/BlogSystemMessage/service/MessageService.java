package com.mercury.BlogSystemMessage.service;

import com.mercury.BlogSystemMessage.bean.BlogConversation;
import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import com.mercury.BlogSystemMessage.dao.BlogConversationDao;
import com.mercury.BlogSystemMessage.dao.BlogDirectMessageDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    @Autowired
    private BlogDirectMessageDao blogDirectMessageDao;
    @Autowired
    private BlogConversationDao blogConversationDao;

    public List<BlogDirectMessage> getMessagesByConversationId(Long conversationId) {

        return blogDirectMessageDao.findByConversationId(conversationId);
    }

    public BlogConversation getOrCreateConversation(BlogConversation c) {
        BlogConversation conversation = blogConversationDao.findByUser1IdAndUser2Id(c.getUser1Id(),c.getUser2Id());
        if (conversation == null) {
            conversation = new BlogConversation();
            conversation.setUser1Id(c.getUser1Id());
            conversation.setUser2Id(c.getUser2Id());
            conversation.setMessages(c.getMessages());
            conversation = blogConversationDao.save(conversation);
        }
        return conversation;
    }

    public BlogDirectMessage sendMessage(Long conversationId, Long senderId, Long receiverId, String content) {

        BlogConversation conversation = blogConversationDao.findById(conversationId).orElse(null);

        if (conversation != null &&
                (conversation.getUser1Id().equals(senderId) && conversation.getUser2Id().equals(receiverId) ||
                        conversation.getUser1Id().equals(receiverId) && conversation.getUser2Id().equals(senderId))) {


            BlogDirectMessage message = new BlogDirectMessage();
            message.setConversation(conversation);
            message.setSenderId(senderId);
            message.setContent(content);
            message.setCreationDate(new Date(System.currentTimeMillis()));
            message.setRead(false);

            return blogDirectMessageDao.save(message);
        } else {
            logger.error("Blog Direct Message null");
            return null;
        }
    }

    public boolean deleteMessage(Long messageId) {
        try {
            blogDirectMessageDao.deleteById(messageId);
            return true;
        } catch (Exception e) {
            // Log the exception and handle it as appropriate
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean deleteConversation(Long conversationId) {
        try {
            List<BlogDirectMessage> messages = blogDirectMessageDao.findByConversationId(conversationId);
            for (BlogDirectMessage message : messages) {
                blogDirectMessageDao.delete(message);
            }
            blogConversationDao.deleteById(conversationId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
