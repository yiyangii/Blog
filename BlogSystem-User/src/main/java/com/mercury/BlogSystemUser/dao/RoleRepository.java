package com.mercury.BlogSystemUser.dao;

import com.mercury.BlogSystemUser.bean.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Role findByRole(String role_user);

}
