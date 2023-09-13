package com.mercury.BlogSystemUser.service;

import com.mercury.BlogSystemUser.dao.RoleRepository;
import com.mercury.BlogSystemUser.dao.UserRepository;
import com.mercury.BlogSystemUser.dao.UserRoleRepository;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
@Service
public class UserListener {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    @Autowired
    public UserListener(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Data
    class UserDeleteStatus {
        private boolean postsDeleted;
        private boolean communityRelatedDeleted;
    }
    Map<Long, UserDeleteStatus> userDeleteStatusMap = new ConcurrentHashMap<>();

    @RabbitListener(queues = "postDeletedUserQueue")
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

    @Transactional
    synchronized public void checkAndDeleteUser(Long userId) {
        UserDeleteStatus status = userDeleteStatusMap.getOrDefault(userId, new UserDeleteStatus());
        if (status.isPostsDeleted() && status.isCommunityRelatedDeleted()) {
            try {
                userRepository.deleteById(userId);
                logger.info("Successfully deleted user with ID: " + userId);
                userDeleteStatusMap.remove(userId);
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
