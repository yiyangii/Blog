package com.mercury.BlogSystemUser.service;


import com.mercury.BlogSystemUser.bean.Role;
import com.mercury.BlogSystemUser.bean.User;
import com.mercury.BlogSystemUser.bean.UserRole;
import com.mercury.BlogSystemUser.config.UserRabbitMQConfig;
import com.mercury.BlogSystemUser.dao.RoleRepository;
import com.mercury.BlogSystemUser.dao.UserRepository;
import com.mercury.BlogSystemUser.dao.UserRoleRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.Data;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {


    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RabbitTemplate rabbitTemplate;

    private final StringRedisTemplate stringRedisTemplate;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, RabbitTemplate rabbitTemplate, StringRedisTemplate stringRedisTemplate, RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.stringRedisTemplate = stringRedisTemplate;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }


    public Optional<User> getUserById(long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            //Send Query notification to Queue : queue.user.query
            rabbitTemplate.convertAndSend(UserRabbitMQConfig.EXCHANGE_USER,UserRabbitMQConfig.ROUTING_KEY_USER_QUERIED,id);
        }
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        user.setRegistrationDate(new Date(System.currentTimeMillis()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        rabbitTemplate.convertAndSend(UserRabbitMQConfig.EXCHANGE_USER,UserRabbitMQConfig.ROUTING_KEY_USER_CREATED,savedUser);
        return userRepository.save(user);
    }

    @Transactional
    public void requestDeleteUser(long id) {
        rabbitTemplate.convertAndSend(UserRabbitMQConfig.EXCHANGE_USER_DELETE, "", id);

    }

    public User updateUser(User user) {
        if (userRepository.existsById(user.getId())) {
            User updatedUser = userRepository.save(user);
            rabbitTemplate.convertAndSend(UserRabbitMQConfig.EXCHANGE_USER, UserRabbitMQConfig.ROUTING_KEY_USER_UPDATED, updatedUser);
            return updatedUser;
        } else {
            throw new RuntimeException("User not found");
        }
    }


    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public User saveUserWithRoles(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            user.setRegistrationDate(new Date(System.currentTimeMillis()));
            Set<UserRole> userRoles = user.getUserRoles();
            userRoles.forEach((userRole)->{
                Role role = (Role) roleRepository.findById(userRole.getRole().getId()).get();
                userRole.setRole(role);
                userRole.setUser(user);
            });
            User savedUser = userRepository.save(user);
            return savedUser;
        } catch (Exception e) {
            throw new RuntimeException("Error while saving the user and roles", e);
        }
    }
    public Optional<User> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            //Send Query notification to Queue : queue.user.query
            rabbitTemplate.convertAndSend(UserRabbitMQConfig.EXCHANGE_USER,UserRabbitMQConfig.ROUTING_KEY_USER_QUERIED,user.get().getId());
        }
        return user;
    }







}
