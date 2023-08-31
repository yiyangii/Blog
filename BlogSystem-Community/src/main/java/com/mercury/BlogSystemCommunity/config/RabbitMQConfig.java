package com.mercury.BlogSystemCommunity.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "community_exchange";
    public static final String ROUTING_KEY_NEW_COMMUNITY = "new.community";
    public static final String ROUTING_KEY_FOLLOW_COMMUNITY = "follow.community";
    public static final String ROUTING_KEY_UNFOLLOW_COMMUNITY = "unfollow.community";
    public static final String ROUTING_KEY_DELETE_COMMUNITY = "delete.community";
    public static final String ROUTING_KEY_DELETE_COMMUNITY_POSTS = "community.deleted.for.post";

    private static final String ROUTING_KEY_COMMUNITY_DELETED_FOR_USER = "community.deleted.for.user";
    private static final String ROUTING_KEY_USER_DELETE_FAILED = "user.delete.failed";
    public static final String ROUTING_KEY_POST_DELETED_ACK = "blog.post.deleted.ack";




    public static final String ROUTING_KEY_COMMUNITY_RELATED_DELETED = "community.related.deleted";

    @Bean
    public Queue postDeletedAckQueue() {
        return new Queue("postDeletedAckQueue");
    }
    @Bean
    public Queue communityRelatedDeletedQueue() {
        return new Queue("communityRelatedDeletedQueue");
    }
    @Bean
    public TopicExchange communityExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue newCommunityQueue() {
        return new Queue("newCommunityQueue");
    }

    @Bean
    public Queue followCommunityQueue() {
        return new Queue("followCommunityQueue");
    }

    @Bean
    public Queue unfollowCommunityQueue() {
        return new Queue("unfollowCommunityQueue");
    }

    @Bean
    public Queue deleteCommunityQueue() {
        return new Queue("deleteCommunityQueue");
    }
    @Bean
    public Queue communityDeletedForUserQueue() {
        return new Queue("communityDeletedForUserQueue");
    }

    @Bean
    public Queue communityDeletedForPostQueue(){
        return new Queue("communityDeletedForPostQueue");
    }

    @Bean
    public Queue userDeleteFailedQueue() {
        return new Queue("userDeleteFailedQueue");
    }

    @Bean
    public Binding bindingCommunityDeletedForUser(Queue communityDeletedForUserQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(communityDeletedForUserQueue).to(communityExchange).with(ROUTING_KEY_COMMUNITY_DELETED_FOR_USER);
    }

    @Bean
    public Binding bindingUserDeleteFailed(Queue userDeleteFailedQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(userDeleteFailedQueue).to(communityExchange).with(ROUTING_KEY_USER_DELETE_FAILED);
    }


    @Bean
    public Binding bindingNewCommunity(Queue newCommunityQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(newCommunityQueue).to(communityExchange).with(ROUTING_KEY_NEW_COMMUNITY);
    }

    @Bean
    public Binding bindingFollowCommunity(Queue followCommunityQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(followCommunityQueue).to(communityExchange).with(ROUTING_KEY_FOLLOW_COMMUNITY);
    }

    @Bean
    public Binding bindingUnfollowCommunity(Queue unfollowCommunityQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(unfollowCommunityQueue).to(communityExchange).with(ROUTING_KEY_UNFOLLOW_COMMUNITY);
    }

    @Bean
    public Binding bindingDeleteCommunity(Queue deleteCommunityQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(deleteCommunityQueue).to(communityExchange).with(ROUTING_KEY_DELETE_COMMUNITY);
    }

    @Bean
    public Binding bindingCommunityRelatedDeleted(Queue communityRelatedDeletedQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(communityRelatedDeletedQueue).to(communityExchange).with(ROUTING_KEY_COMMUNITY_RELATED_DELETED);
    }

    @Bean
    public Binding bindingPostDeletedAck(Queue postDeletedAckQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(postDeletedAckQueue).to(communityExchange).with(ROUTING_KEY_POST_DELETED_ACK);
    }

}
