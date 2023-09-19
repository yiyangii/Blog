    package com.mercury.BlogSystemAuth.service;

    import com.mercury.BlogSystemAuth.config.RabbitMQConfig;
    import org.springframework.amqp.rabbit.core.RabbitTemplate;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.stereotype.Service;

    @Service
    public class UserDetailServiceImpl implements UserDetailsService {
        @Autowired
        private RabbitTemplate rabbitTemplate;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            UserDetails userDetails = (UserDetails) rabbitTemplate.convertSendAndReceive(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY_USER_DETAIL, username);
            System.out.println(userDetails);
            if (userDetails == null) {
                throw new UsernameNotFoundException("User not found");
            }

            return userDetails;
        }
    }
