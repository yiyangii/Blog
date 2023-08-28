package com.mercury.BlogSystemProject.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    //spring.rabbitmq.template.exchange=blog.exchange

    public static final String EXCHANGE_NAME = "blog.exchange";
    public static final String QUEUE_USER_DELETE_REQUEST = "user.delete.request.queue";
    public static final String QUEUE_POSTS_DELETED_FOR_USER = "posts.deleted.for.user.queue";
    public static final String QUEUE_USER_DELETE_FAILED = "user.delete.failed.queue";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue userDeleteRequestQueue() {
        return new Queue(QUEUE_USER_DELETE_REQUEST, true);
    }

    @Bean
    public Queue postsDeletedForUserQueue() {
        return new Queue(QUEUE_POSTS_DELETED_FOR_USER, true);
    }

    @Bean
    public Queue userDeleteFailedQueue() {
        return new Queue(QUEUE_USER_DELETE_FAILED, true);
    }

    @Bean
    public Binding bindingUserDeleteRequest(Queue userDeleteRequestQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userDeleteRequestQueue).to(exchange).with("user.delete.request");
    }

    @Bean
    public Binding bindingPostsDeletedForUser(Queue postsDeletedForUserQueue, TopicExchange exchange) {
        return BindingBuilder.bind(postsDeletedForUserQueue).to(exchange).with("posts.deleted.for.user");
    }

    @Bean
    public Binding bindingUserDeleteFailed(Queue userDeleteFailedQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userDeleteFailedQueue).to(exchange).with("user.delete.failed");
    }
}

