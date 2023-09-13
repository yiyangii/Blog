package com.mercury.BlogSystemUser.dao;

import com.mercury.BlogSystemUser.bean.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRoleRepository extends JpaRepository<UserRole,Long> {
}
