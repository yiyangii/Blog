package com.mercury.BlogSystemUser.service;


import com.mercury.BlogSystemUser.bean.User;
import com.mercury.BlogSystemUser.dao.UserRepository;
import lombok.Data;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    @Data
    class UserDeleteStatus {
        private boolean postsDeleted;
        private boolean communityRelatedDeleted;
        // getters and setters
    }

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RabbitTemplate rabbitTemplate;

    Map<Long, UserDeleteStatus> userDeleteStatusMap = new ConcurrentHashMap<>();

    @Autowired
    public UserService(UserRepository userRepository, RabbitTemplate rabbitTemplate) {
        this.userRepository = userRepository;
        this.rabbitTemplate = rabbitTemplate;
    }


    private static final String ROUTING_KEY_FOLLOW_COMMUNITY = "follow.community";
    private static final String ROUTING_KEY_NEW_COMMUNITY = "new.community";
    private static final String EXCHANGE_NAME = "blog.exchange";
    private static final String ROUTING_KEY_USER_DELETE_REQUEST = "user.delete.request";
    private static final String ROUTING_KEY_USER_DELETE_FAILED = "user.delete.failed";

    private static final String ROUTING_KEY_USER_CREATED = "user.created";
    private static final String ROUTING_KEY_USER_UPDATED = "user.updated";
    private static final String ROUTING_KEY_USER_QUERIED = "user.queried";

    public Optional<User> getUserById(long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            rabbitTemplate.convertAndSend(EXCHANGE_NAME,ROUTING_KEY_USER_QUERIED,id);
        }
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        System.out.println(user);
        user.setRegistrationDate(new Date(System.currentTimeMillis()));
        User savedUser = userRepository.save(user);
        rabbitTemplate.convertAndSend(EXCHANGE_NAME,ROUTING_KEY_USER_CREATED,savedUser);
        return userRepository.save(user);
    }

    public void requestDeleteUser(long id) {
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_USER_DELETE_REQUEST, id);
    }

    public User updateUser(User user) {
        if (userRepository.existsById(user.getId())) {
            User updatedUser = userRepository.save(user);
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_USER_UPDATED, updatedUser);
            return updatedUser;
        } else {
            throw new RuntimeException("User not found");
        }
    }

//    @RabbitListener(queues = "posts.deleted.for.user.queue")
//    public void handlePostsDeletedForUser(Long userId) {
//        try {
//            userRepository.deleteById(userId);
//            logger.info("Successfully deleted user with ID: " + userId);
//        } catch (Exception e) {
//            logger.error("Error deleting user with ID: " + userId, e);
//            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY_USER_DELETE_FAILED, userId);
//        }
//    }

    @RabbitListener(queues = "posts.deleted.for.user.queue")
    public void handlePostsDeletedForUser(Long userId) {
        logger.info("receive post deleted");
        UserDeleteStatus status = userDeleteStatusMap.getOrDefault(userId, new UserDeleteStatus());
        status.setPostsDeleted(true);
        userDeleteStatusMap.put(userId, status);
        checkAndDeleteUser(userId);
    }

    @RabbitListener(queues = "communityRelatedDeletedQueue")
    public void handleCommunityRelatedDeletedForUser(Long userId) {
        logger.info("receive community deleted");

        UserDeleteStatus status = userDeleteStatusMap.getOrDefault(userId, new UserDeleteStatus());
        status.setCommunityRelatedDeleted(true);
        userDeleteStatusMap.put(userId, status);
        checkAndDeleteUser(userId);
    }

    private void checkAndDeleteUser(Long userId) {
        UserDeleteStatus status = userDeleteStatusMap.getOrDefault(userId, new UserDeleteStatus());
        if (status.isPostsDeleted() && status.isCommunityRelatedDeleted()) {
            try {
                userRepository.deleteById(userId);
                logger.info("Successfully deleted user with ID: " + userId);
                userDeleteStatusMap.remove(userId); // 清除状态
            } catch (Exception e) {
                logger.error("Error deleting user with ID: " + userId, e);
            }
        }
    }

    @RabbitListener(queues = "user.delete.failed.queue")
    public void handleUserDeleteFailed(Long userId) {
        logger.error("Failed to delete user with ID: " + userId);
    }

    @RabbitListener(queues = "followCommunityQueue")
    public void handleUserFollowedCommunity(Map<String, Object> message) {
        try {
            Long userId = (Long) message.get("userId");
            Long communityId = (Long) message.get("communityId");
            logger.info("User with ID: " + userId + " has followed the community with ID: " + communityId);

        } catch (Exception e) {
            logger.error("Error handling follow community message", e);
        }
    }

    @RabbitListener(queues = "newCommunityQueue")
    public void handleNewCommunityCreated(Map<String, Object> message) {
        try {
            Long communityId = (Long) message.get("communityId");
            Long userId = (Long) message.get("userId");
            logger.info("New community with ID: " + communityId + " has been created by user with ID: " + userId);

        } catch (Exception e) {
            logger.error("Error handling new community message", e);
        }
    }



}
