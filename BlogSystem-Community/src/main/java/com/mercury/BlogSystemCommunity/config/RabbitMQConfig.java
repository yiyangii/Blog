package com.mercury.BlogSystemCommunity.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "community_exchange";
    public static final String ROUTING_KEY_NEW_COMMUNITY = "new.community";
    public static final String ROUTING_KEY_FOLLOW_COMMUNITY = "follow.community";


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
    public Binding bindingNewCommunity(Queue newCommunityQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(newCommunityQueue).to(communityExchange).with(ROUTING_KEY_NEW_COMMUNITY);
    }

    @Bean
    public Binding bindingFollowCommunity(Queue followCommunityQueue, TopicExchange communityExchange) {
        return BindingBuilder.bind(followCommunityQueue).to(communityExchange).with(ROUTING_KEY_FOLLOW_COMMUNITY);
    }

}
