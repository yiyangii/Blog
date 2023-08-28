package com.mercury.BlogSystemProject.dao.community;

import com.mercury.BlogSystemProject.bean.community.BlogCommunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommunityRepository extends JpaRepository<BlogCommunity, Long> {
}
