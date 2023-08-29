package com.mercury.BlogSystemCommunity.service;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogUserCommunity;
import com.mercury.BlogSystemCommunity.config.RabbitMQConfig;
import com.mercury.BlogSystemCommunity.dao.BlogCommunityRepository;
import com.mercury.BlogSystemCommunity.dao.BlogUserCommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
    private RabbitTemplate rabbitTemplate;

    // 创建新社群
    public BlogCommunity createCommunity(BlogCommunity blogCommunity) {


        BlogCommunity savedCommunity = blogCommunityRepository.save(blogCommunity);


        Map<String, Object> newCommunityMessage = new HashMap<>();
        newCommunityMessage.put("type", "NEW_COMMUNITY");
        newCommunityMessage.put("communityId", savedCommunity.getId());
        newCommunityMessage.put("userId",savedCommunity.getCommunityCreator());
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_NEW_COMMUNITY, newCommunityMessage);

        return savedCommunity;
    }


    public String followCommunity(Long userId, Long communityId) {
        BlogUserCommunity userCommunity = new BlogUserCommunity();
        userCommunity.setUserId(Long.valueOf(userId));
        userCommunity.setCommunityId(Long.valueOf(communityId));
        blogUserCommunityRepository.save(userCommunity);


        Map<String, Object> followMessage = new HashMap<>();
        followMessage.put("type", "FOLLOW_COMMUNITY");
        followMessage.put("userId", userId);
        followMessage.put("communityId", communityId);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_FOLLOW_COMMUNITY, followMessage);

        return "Followed community successfully";
    }
}
