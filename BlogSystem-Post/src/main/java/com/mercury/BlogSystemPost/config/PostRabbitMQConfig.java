package com.mercury.BlogSystemPost.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PostRabbitMQConfig {

    public static final String EXCHANGE_NAME = "blog.exchange";

    public static final String ROUTING_KEY_POST_CREATED = "blog.post.created";
    public static final String ROUTING_KEY_POST_UPDATED = "blog.post.updated";
    public static final String ROUTING_KEY_POST_DELETED = "blog.post.deleted";
    public static final String ROUTING_KEY_POST_COMMUNITY = "blog.post.community";

    public static final String ROUTING_KEY_POSTS_DELETED_FOR_USER = "posts.deleted.for.user";
    public static final String ROUTING_KEY_USER_DELETE_FAILED = "user.delete.failed";

    @Bean
    public TopicExchange blogExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue postCreatedQueue() {
        return new Queue("postCreatedQueue");
    }

    @Bean
    public Queue postUpdatedQueue() {
        return new Queue("postUpdatedQueue");
    }

    @Bean
    public Queue postDeletedQueue() {
        return new Queue("postDeletedQueue");
    }

    @Bean
    public Queue postCommunityQueue() {
        return new Queue("postCommunityQueue");
    }

    @Bean
    public Binding bindingPostCreated(Queue postCreatedQueue, TopicExchange blogExchange) {
        return BindingBuilder.bind(postCreatedQueue).to(blogExchange).with(ROUTING_KEY_POST_CREATED);
    }

    @Bean
    public Binding bindingPostUpdated(Queue postUpdatedQueue, TopicExchange blogExchange) {
        return BindingBuilder.bind(postUpdatedQueue).to(blogExchange).with(ROUTING_KEY_POST_UPDATED);
    }

    @Bean
    public Binding bindingPostDeleted(Queue postDeletedQueue, TopicExchange blogExchange) {
        return BindingBuilder.bind(postDeletedQueue).to(blogExchange).with(ROUTING_KEY_POST_DELETED);
    }

    @Bean
    public Binding bindingPostCommunity(Queue postCommunityQueue, TopicExchange blogExchange) {
        return BindingBuilder.bind(postCommunityQueue).to(blogExchange).with(ROUTING_KEY_POST_COMMUNITY);
    }
}

