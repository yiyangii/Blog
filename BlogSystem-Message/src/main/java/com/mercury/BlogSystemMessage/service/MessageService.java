package com.mercury.BlogSystemMessage.service;

import com.mercury.BlogSystemMessage.bean.BlogConversation;
import com.mercury.BlogSystemMessage.bean.BlogDirectMessage;
import com.mercury.BlogSystemMessage.config.RabbitMQConfig;
import com.mercury.BlogSystemMessage.dao.BlogConversationDao;
import com.mercury.BlogSystemMessage.dao.BlogDirectMessageDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Service
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    @Autowired
    RabbitTemplate rabbitTemplate;
    @Autowired
    private BlogDirectMessageDao blogDirectMessageDao;
    @Autowired
    private BlogConversationDao blogConversationDao;

    public List<BlogDirectMessage> getMessagesByConversationId(Long conversationId) {

        return blogDirectMessageDao.findByConversationId(conversationId);
    }

    public BlogConversation getOrCreateConversation(BlogConversation c) {
        BlogConversation conversation = blogConversationDao.findByUser1IdAndUser2Id(c.getUser1Id(), c.getUser2Id());

        if (conversation == null) {
            conversation = new BlogConversation();
            conversation.setUser1Id(c.getUser1Id());
            conversation.setUser2Id(c.getUser2Id());

            conversation = blogConversationDao.save(conversation);
        }

        List<BlogDirectMessage> messages = c.getMessages();
        if (messages != null && !messages.isEmpty()) {
            for (BlogDirectMessage message : messages) {
                message.setConversation(conversation);
                blogDirectMessageDao.save(message);
            }
        }

        return conversation;
    }

    public BlogDirectMessage sendMessage(BlogDirectMessage blogDirectMessage, Long conversationId) {
        System.out.println(conversationId);

        BlogConversation conversation = blogConversationDao.findById(conversationId).orElse(null);


        if (conversation == null) {
            logger.error("Conversation with ID " + conversationId + " not found");
            return null;
        }

        Long senderId = blogDirectMessage.getSenderId();
        Long receiverId = blogDirectMessage.getReceiverId();
        String content = blogDirectMessage.getContent();

        if (conversation.getUser1Id().equals(senderId) && conversation.getUser2Id().equals(receiverId) ||
                conversation.getUser1Id().equals(receiverId) && conversation.getUser2Id().equals(senderId)) {

            BlogDirectMessage message = new BlogDirectMessage();
            message.setConversation(conversation);
            message.setSenderId(senderId);
            message.setContent(content);
            message.setCreationDate(new Date(System.currentTimeMillis()));
            message.setReceiverId(receiverId);
            message.setRead(false);

            return blogDirectMessageDao.save(message);
        } else {
            logger.error("User IDs do not match with the conversation");
            return null;
        }
    }


    public boolean deleteMessage(Long messageId) {
        try {
            blogDirectMessageDao.deleteById(messageId);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Transactional
    @RabbitListener(queues = "queue.user.delete.request.message")
    public void handleUserDeleteRequest(Long userId) {
        logger.info("receive delete request");
        try {
            deleteConversationByUserId(userId);
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_MESSAGE_DELETED_USER, userId);
            logger.info("send delete message to user service");
        } catch(Exception e) {
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_USER_DELETE_FAILED, userId);
            logger.error("Error deleting posts for user ID: " + userId , e);
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
    public boolean deleteConversationByUserId(Long userId) {
        try {
            List<BlogDirectMessage> messages1 = blogDirectMessageDao.findBysenderId(userId);
            for (BlogDirectMessage message : messages1) {
                blogDirectMessageDao.delete(message);
            }
            blogConversationDao.deleteByuser1Id(userId);
            List<BlogDirectMessage> messages2 = blogDirectMessageDao.findByreceiverId(userId);
            for (BlogDirectMessage message : messages2) {
                blogDirectMessageDao.delete(message);
            }
            blogConversationDao.deleteByuser2Id(userId);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
