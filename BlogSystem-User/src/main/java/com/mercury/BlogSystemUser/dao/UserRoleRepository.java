package com.mercury.BlogSystemUser.dao;

import com.mercury.BlogSystemUser.bean.Role;
import com.mercury.BlogSystemUser.bean.User;
import com.mercury.BlogSystemUser.bean.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRoleRepository extends JpaRepository<UserRole,Long> {
    List<UserRole> findRolesByUser(User user);
}
