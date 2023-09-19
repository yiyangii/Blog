package com.mercury.BlogSystemUser.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserRabbitMQConfig {

    // Exchanges
    public static final String EXCHANGE_USER = "blog.exchange.user";
    public static final String EXCHANGE_USER_DELETE = "blog.exchange.delete";

    // Queues
    public static final String QUEUE_USER_CREATED = "queue.user.created";
    public static final String QUEUE_USER_UPDATED = "queue.user.updated";
    public static final String QUEUE_USER_DELETE_REQUEST_COMMUNITY = "queue.user.delete.request.community";
    public static final String QUEUE_USER_DELETE_REQUEST_POST = "queue.user.delete.request.post";
    public static final String QUEUE_USER_DELETE_REQUEST_MESSAGE = "queue.user.delete.request.message";


    public static final String QUEUE_USER_DELETE_FAILED = "queue.user.delete.failed";
    public static final String QUEUE_USER_Query = "queue.user.query";

    // Routing Keys
    public static final String ROUTING_KEY_USER_CREATED = "routing.user.created";
    public static final String ROUTING_KEY_USER_UPDATED = "routing.user.updated";
    public static final String ROUTING_KEY_USER_QUERIED = "routing.user.query";
    public static final String LISTENER_QUEUE_USER_DETAIL = "UserDetailQueue";

    @Bean
    public FanoutExchange userExchange() {
        return new FanoutExchange(EXCHANGE_USER);
    }
    @Bean
    public FanoutExchange userDeleteExchange() {
        return new FanoutExchange(EXCHANGE_USER_DELETE);
    }

    @Bean
    public Queue userCreatedQueue() {
        return new Queue(QUEUE_USER_CREATED);
    }

    @Bean
    public Queue userUpdatedQueue() {
        return new Queue(QUEUE_USER_UPDATED);
    }


    @Bean
    public Queue userDeleteRequestMessageQueue() {
        return new Queue(QUEUE_USER_DELETE_REQUEST_MESSAGE);
    }


    @Bean
    public Queue userDeleteRequestCommunityQueue() {
        return new Queue(QUEUE_USER_DELETE_REQUEST_COMMUNITY);
    }

    @Bean
    public Queue userDeleteRequestPostQueue() {
        return new Queue(QUEUE_USER_DELETE_REQUEST_POST);
    }

    @Bean
    public Queue userDeleteFailedQueue() {
        return new Queue(QUEUE_USER_DELETE_FAILED);
    }

    @Bean
    public Queue userQueryQueue() {
        return new Queue(QUEUE_USER_Query);
    }



    // Bindings
    @Bean
    public Binding bindUserCreated() {
        return BindingBuilder.bind(userCreatedQueue()).to(userExchange());
    }

    @Bean
    public Binding bindUserUpdated() {
        return BindingBuilder.bind(userUpdatedQueue()).to(userExchange());
    }

    @Bean
    public Binding bindUserDeleteCommunityRequest() {
        return BindingBuilder.bind(userDeleteRequestCommunityQueue()).to(userDeleteExchange());
    }

    @Bean
    public Binding bindUserDeletePostRequest() {
        return BindingBuilder.bind(userDeleteRequestPostQueue()).to(userDeleteExchange());
    }

    @Bean
    public Binding bindUserDeleteMessageRequest() {
        return BindingBuilder.bind(userDeleteRequestMessageQueue()).to(userDeleteExchange());
    }

    @Bean
    public Binding bindUserDeleteFailed() {
        return BindingBuilder.bind(userDeleteFailedQueue()).to(userExchange());
    }

    @Bean
    public Binding bindUserQuery() {
        return BindingBuilder.bind(userDeleteFailedQueue()).to(userExchange());
    }
}
