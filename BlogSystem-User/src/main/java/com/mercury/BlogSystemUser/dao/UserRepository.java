package com.mercury.BlogSystemUser.dao;

import com.mercury.BlogSystemUser.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {}

