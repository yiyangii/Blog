package com.mercury.BlogSystemCommunity.dao;

import com.mercury.BlogSystemCommunity.bean.BlogUserCommunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface BlogUserCommunityRepository extends JpaRepository<BlogUserCommunity, Long> {
    @Transactional
    void deleteByUserIdAndCommunityId(Long userId, Long communityId);
}
