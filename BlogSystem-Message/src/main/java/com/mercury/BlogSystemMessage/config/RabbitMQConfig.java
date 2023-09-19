package com.mercury.BlogSystemMessage.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String EXCHANGE_NAME = "blog.exchange";
    public static final String ROUTING_KEY_MESSAGE_DELETED_USER = "blog.message.deleted.user";

    public static final String QUEUE_NAME = "postDeletedUserQueue";
    public static final String ROUTING_KEY_USER_DELETE_FAILED = "user.delete.failed";



    @Bean
    public Queue postDeletedUserQueue() {
            return new Queue(QUEUE_NAME);
    }


    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY_MESSAGE_DELETED_USER);

    }
}
