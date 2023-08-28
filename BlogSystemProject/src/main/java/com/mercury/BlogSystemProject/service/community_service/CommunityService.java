package com.mercury.BlogSystemProject.service.community_service;

import com.mercury.BlogSystemProject.bean.community.BlogCommunity;
import com.mercury.BlogSystemProject.bean.community.BlogPostCommunity;
import com.mercury.BlogSystemProject.bean.community.BlogUserCommunity;
import com.mercury.BlogSystemProject.dao.community.BlogCommunityRepository;
import com.mercury.BlogSystemProject.dao.community.BlogPostCommunityRepository;
import com.mercury.BlogSystemProject.dao.community.BlogUserCommunityRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class CommunityService {

    @Autowired
    private BlogCommunityRepository blogCommunityRepository;

    @Autowired
    private BlogUserCommunityRepository blogUserCommunityRepository;

    @Autowired
    private BlogPostCommunityRepository blogPostCommunityRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public BlogCommunity createCommunity(BlogCommunity community) {
        // 创建社群
        BlogCommunity savedCommunity = blogCommunityRepository.save(community);

        // 发送消息给用户服务，通知有新的社群创建
        Map<String, Object> message = new HashMap<>();
        message.put("type", "NEW_COMMUNITY");
        message.put("communityId", savedCommunity.getId());
        rabbitTemplate.convertAndSend("your_exchange_name", "your_routing_key", message);

        return savedCommunity;
    }

    public void followCommunity(Integer userId, Integer communityId) {
        // 用户关注社群
        BlogUserCommunity userCommunity = new BlogUserCommunity();
        userCommunity.setUserId(Long.valueOf(userId));
        userCommunity.setCommunityId(Long.valueOf(communityId));
        blogUserCommunityRepository.save(userCommunity);

        // 发送消息给用户服务，通知有用户关注了新的社群
        Map<String, Object> message = new HashMap<>();
        message.put("type", "FOLLOW_COMMUNITY");
        message.put("userId", userId);
        message.put("communityId", communityId);
        rabbitTemplate.convertAndSend("your_exchange_name", "your_routing_key", message);
    }

    public void unfollowCommunity(Integer userId, Integer communityId) {
        // 用户取消关注社群
        blogUserCommunityRepository.deleteById(new BlogUserCommunityId(userId, communityId));

        // 发送消息给用户服务，通知有用户取消关注了社群
        Map<String, Object> message = new HashMap<>();
        message.put("type", "UNFOLLOW_COMMUNITY");
        message.put("userId", userId);
        message.put("communityId", communityId);
        rabbitTemplate.convertAndSend("your_exchange_name", "your_routing_key", message);
    }

    public void addPostToCommunity(Integer postId, Integer communityId) {
        // 添加帖子到社群
        BlogPostCommunity postCommunity = new BlogPostCommunity();
        postCommunity.setPostId(Long.valueOf(postId));
        postCommunity.setCommunityId(Long.valueOf(communityId));
        blogPostCommunityRepository.save(postCommunity);

        // 发送消息给用户服务，通知社群有新的帖子
        Map<String, Object> message = new HashMap<>();
        message.put("type", "NEW_POST_IN_COMMUNITY");
        message.put("postId", postId);
        message.put("communityId", communityId);
        rabbitTemplate.convertAndSend("your_exchange_name", "your_routing_key", message);
    }
}
