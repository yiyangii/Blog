package com.mercury.BlogSystemProject.dao.community;

import com.mercury.BlogSystemProject.bean.community.BlogPostCommunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostCommunityRepository extends JpaRepository<BlogPostCommunity, Long> {
    //
}
