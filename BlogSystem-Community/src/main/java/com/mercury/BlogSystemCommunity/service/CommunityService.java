package com.mercury.BlogSystemCommunity.service;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogPostCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogUserCommunity;
import com.mercury.BlogSystemCommunity.config.RabbitMQConfig;
import com.mercury.BlogSystemCommunity.dao.BlogCommunityRepository;
import com.mercury.BlogSystemCommunity.dao.BlogPostCommunityRepository;
import com.mercury.BlogSystemCommunity.dao.BlogUserCommunityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CommunityService {
    private static final Logger logger = LoggerFactory.getLogger(CommunityService.class);


    @Autowired
    private BlogCommunityRepository blogCommunityRepository;

    @Autowired
    private BlogPostCommunityRepository blogPostCommunityRepository;

    @Autowired
    private BlogUserCommunityRepository blogUserCommunityRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public List<BlogCommunity> getAllCommunities() {
        return blogCommunityRepository.findAll();
    }
    public BlogCommunity createCommunity(BlogCommunity blogCommunity) {


        BlogCommunity savedCommunity = blogCommunityRepository.save(blogCommunity);
        Long generatedId = savedCommunity.getId();

        Map<String, Object> newCommunityMessage = new HashMap<>();
        newCommunityMessage.put("type", "NEW_COMMUNITY");
        newCommunityMessage.put("communityId", (Long)savedCommunity.getId());
        newCommunityMessage.put("userId",(Long)savedCommunity.getCommunityCreator());
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_NEW_COMMUNITY, newCommunityMessage);
        logger.info("Sent NEW_COMMUNITY message: {}", newCommunityMessage);

        return savedCommunity;
    }


    public String followCommunity(Long userId, Long communityId) {
        BlogUserCommunity userCommunity = new BlogUserCommunity();
        userCommunity.setUserId(Long.valueOf(userId));
        userCommunity.setCommunityId(Long.valueOf(communityId));
        blogUserCommunityRepository.save(userCommunity);


        Map<String, Object> followMessage = new HashMap<>();
        followMessage.put("type", "FOLLOW_COMMUNITY");
        followMessage.put("userId", (Long)userId);
        followMessage.put("communityId", (Long)communityId);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_FOLLOW_COMMUNITY, followMessage);
        logger.info("Sent FOLLOW_COMMUNITY message: {}", followMessage);

        return "Followed community successfully";
    }

    public String unfollowCommunity(Long userId, Long communityId) {

        blogUserCommunityRepository.deleteByUserIdAndCommunityId(userId, communityId);


        Map<String, Object> unfollowMessage = new HashMap<>();
        unfollowMessage.put("type", "UNFOLLOW_COMMUNITY");
        unfollowMessage.put("userId", userId);
        unfollowMessage.put("communityId", communityId);

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_UNFOLLOW_COMMUNITY, unfollowMessage);

        logger.info("Unfollow message sent: {}", unfollowMessage);

        return "Unfollowed community successfully";
    }

    @Transactional
    public String deleteCommunity(Long communityId, Long userId) {
        Optional<BlogCommunity> community = blogCommunityRepository.findById(communityId);

        if(community.isPresent()) {
            if(community.get().getCommunityCreator().equals(userId)) {

                blogUserCommunityRepository.deleteByCommunityId(communityId);
                blogPostCommunityRepository.deleteByCommunityId(communityId);
                blogUserCommunityRepository.deleteByUserId(userId);


                blogCommunityRepository.deleteById(communityId);

                Map<String, Object> deleteMessage = new HashMap<>();
                deleteMessage.put("type", "DELETE_COMMUNITY");
                deleteMessage.put("communityId", communityId);
                rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_DELETE_COMMUNITY, deleteMessage);

                logger.info("Deleted community with ID: {}", communityId);
                logger.info("Delete community message sent: {}", deleteMessage);

                return "Deleted community successfully";
            } else {
                return "You are not authorized to delete this community";
            }
        } else {
            return "Community not found";
        }
    }


    @RabbitListener(queues = "postCommunityQueue")
    public void handlePostCommunityMessage(Map<String, Object> message) {

            int postId = (int) message.get("postId");
            String communityName = (String) message.get("communityName");

            Long communityId = blogCommunityRepository.getCommunityIdBycommunityName(communityName);

            BlogPostCommunity relation = new BlogPostCommunity();
            relation.setPostId((long) postId);
            relation.setCommunityId(communityId);

            blogPostCommunityRepository.save(relation);
            logger.info("Successfully saved the relation between postId {} and communityId {}", postId, communityId);
    }

    @Transactional
    @RabbitListener(queues = "queue.user.delete.request.community")
    public void handleUserDeleteRequest(Long userId) {
        logger.info("receive delete request");
        try {
            blogUserCommunityRepository.deleteByUserId(userId);

            List<BlogCommunity> communitiesCreatedByUser = blogCommunityRepository.findAllBycommunityCreator(userId);
            for (BlogCommunity community : communitiesCreatedByUser) {
                deleteCommunity(community.getId(),userId);
                rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_DELETE_COMMUNITY_POSTS, community.getId());
                logger.info("delete community id " + community.getId());

            }
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_COMMUNITY_RELATED_DELETED, userId);
            logger.info("send delete community message to user service");



        } catch (Exception e) {
            logger.error("Error while processing delete request for user ID: {}", userId, e);
        }
    }



    @Transactional
    @RabbitListener(queues = "communityDeletedForPostQueue")
    public void handleCommunityPostsDeleted(Long communityId){
        try {
            blogCommunityRepository.deleteById(communityId);
        } catch (Exception e) {
            logger.error("Error while deleting community ID: {}", communityId, e);

        }

    }



    @Transactional
    @RabbitListener(queues = "postDeletedQueue")
    public void handlePostDelete(Long postId) {
        try {
            List<BlogPostCommunity> relatedCommunities = blogPostCommunityRepository.findAllByPostId(postId);

            if (!relatedCommunities.isEmpty()) {
                blogPostCommunityRepository.deleteBypostId(postId);
                logger.info("Deleted post with ID: {}", postId);

                rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_POST_DELETED_ACK, postId);
            } else {
                rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_POST_DELETED_ACK, postId);
            }

        } catch (Exception e) {
            logger.error("Error while processing delete request for post ID: {}", postId, e);
        }
    }

    public List<BlogCommunity> getTopCommunities() {
        Pageable topFive = PageRequest.of(0, 5);
        Page<BlogCommunity> page = blogCommunityRepository.findTopCommunities(topFive);
        return page.getContent();
    }



}



