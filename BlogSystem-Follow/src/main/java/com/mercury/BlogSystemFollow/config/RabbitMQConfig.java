package com.mercury.BlogSystemFollow.config;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "blog.follow.exchange";
    public static final String ROUTING_KEY_USER_FOLLOW_VALID = "blog.follow.user.valid";
    public static final String ROUTING_KEY_USER_FOLLOW_DELETE = "blog.follow.user.delete";

    public static final String QUEUE_USER_VALID = "user.follow.valid.queue";
    public static final String QUEUE_USER_DELETE = "followerDeletedUserQueue";


    @Bean
    public TopicExchange followExchange(){
        return new TopicExchange(EXCHANGE_NAME);
    }
    @Bean
    public Queue userValidQueue(){
        return new Queue(QUEUE_USER_VALID);
    }
    @Bean Queue deleteFollowRelatedQueue(){
        return new Queue(QUEUE_USER_DELETE);
    }

    @Bean
    public Binding bindUserValidQueue(){
        return BindingBuilder.bind(userValidQueue()).to(followExchange()).with(ROUTING_KEY_USER_FOLLOW_VALID);
    }

    @Bean
    public Binding bindUserUserDeleteQueue(){
        return BindingBuilder.bind(deleteFollowRelatedQueue()).to(followExchange()).with(ROUTING_KEY_USER_FOLLOW_DELETE);
    }



}
