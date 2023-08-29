package com.mercury.BlogSystemCommunity.service;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogPostCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogUserCommunity;
import com.mercury.BlogSystemCommunity.dao.BlogCommunityRepository;
import com.mercury.BlogSystemCommunity.dao.BlogPostCommunityRepository;
import com.mercury.BlogSystemCommunity.dao.BlogUserCommunityRepository;
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



    public String followCommunity(Integer userId, Integer communityId) {
        try {
            //user follow community and save the relationship
            BlogUserCommunity userCommunity = new BlogUserCommunity();
            userCommunity.setUserId(Long.valueOf(userId));
            userCommunity.setCommunityId(Long.valueOf(communityId));
            blogUserCommunityRepository.save(userCommunity);

            // 发送消息给社群创建者，通知有新的关注者
            Map<String, Object> messageToCreator = new HashMap<>();
            messageToCreator.put("type", "FOLLOW_COMMUNITY");
            messageToCreator.put("userId", userId);
            messageToCreator.put("communityId", communityId);
            rabbitTemplate.convertAndSend("community_exchange", "follow.community", messageToCreator);

            // 发送消息给关注社群的用户，通知关注成功
            Map<String, Object> messageToUser = new HashMap<>();
            messageToUser.put("type", "FOLLOW_SUCCESS");
            messageToUser.put("userId", userId);
            messageToUser.put("communityId", communityId);
            rabbitTemplate.convertAndSend("user_exchange", "follow.success", messageToUser);

            return "Followed successfully";
        } catch (Exception e) {
            return "Error occurred while following: " + e.getMessage();
        }
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
