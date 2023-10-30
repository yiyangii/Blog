package com.mercury.BlogSystemUser.dao;

import com.mercury.BlogSystemUser.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> getUserById(long userId);

    Optional<User> getUserByusername(String username);

    Optional<User> findByUsername(String username);
}

