package com.mercury.BlogSystemUser.service;

import com.mercury.BlogSystemUser.bean.Role;
import com.mercury.BlogSystemUser.bean.User;
import com.mercury.BlogSystemUser.bean.UserRole;
import com.mercury.BlogSystemUser.config.UserRabbitMQConfig;
import com.mercury.BlogSystemUser.dao.RoleRepository;
import com.mercury.BlogSystemUser.dao.UserRepository;
import com.mercury.BlogSystemUser.dao.UserRoleRepository;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class UserListener {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    @Autowired
    public UserListener(UserRepository userRepository, RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;

        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @Data
    class UserDeleteStatus {
        private boolean postsDeleted;
        private boolean communityRelatedDeleted;
        private boolean messageDeleted;
        private boolean followerDeleted;
    }
    Map<Long, UserDeleteStatus> userDeleteStatusMap = new ConcurrentHashMap<>();
    @RabbitListener(queues = "followerDeletedUserQueue")
    public void handleFollowerDeletedForUser(Long userId) {
        logger.info("receive follower deleted");
        UserDeleteStatus status = userDeleteStatusMap.getOrDefault(userId, new UserDeleteStatus());
        status.setPostsDeleted(true);
        userDeleteStatusMap.put(userId, status);
        checkAndDeleteUser(userId);
    }
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

    @RabbitListener(queues = UserRabbitMQConfig.QUEUE_USER_DELETE_REQUEST_MESSAGE)
    public void handleMessageRelatedDeletedForUser(Long userId) {
        logger.info("receive message deleted");
        UserDeleteStatus status = userDeleteStatusMap.getOrDefault(userId, new UserDeleteStatus());
        status.setMessageDeleted(true);
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

    @RabbitListener(queues = UserRabbitMQConfig.LISTENER_QUEUE_USER_DETAIL)
    public UserDetails buildUserDetails(String userName) {
        Logger logger = LoggerFactory.getLogger(getClass()); // 初始化日志对象
        try {
            if (userName == null || userName.trim().isEmpty()) {
                logger.error("Received empty or null username");
            }
            logger.info("Received user username: {}", userName);
            Optional<User> optionalUser = userRepository.getUserByusername(userName);
            if (!optionalUser.isPresent()) {
                logger.error("User not found for username: {}", userName);
            }else{
                logger.info(optionalUser.toString());
            }
            User user = optionalUser.get();
            List<UserRole> roles = userRoleRepository.findRolesByUser(user);
            List<Role> actualRoles = new ArrayList<>();
            for (UserRole userRole : roles) {
                Role role = roleRepository.findById(userRole.getRole().getId()).orElse(null); // 假设getRoleId()返回Role的ID
                if (role != null) {
                    actualRoles.add(role);
                }
            }
            List<GrantedAuthority> authorities = actualRoles.stream()
                    .map(role -> new SimpleGrantedAuthority(role.getRole().toUpperCase()))
                    .collect(Collectors.toList());
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    authorities
            );
            logger.info("UserDetails built successfully for username: {}", userName);
            return userDetails;
        } catch (UsernameNotFoundException e) {
            logger.error("User not found: {}", e.getMessage());

        } catch (IllegalArgumentException e) {
            logger.error("Invalid argument: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("An unexpected error occurred: {}", e.getMessage());
        }
        return null;
    }

}
