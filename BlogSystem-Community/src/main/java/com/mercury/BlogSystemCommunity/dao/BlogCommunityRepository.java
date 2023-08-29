package com.mercury.BlogSystemCommunity.dao;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommunityRepository extends JpaRepository<BlogCommunity, Long> {
    void deleteById(Long id);

}
