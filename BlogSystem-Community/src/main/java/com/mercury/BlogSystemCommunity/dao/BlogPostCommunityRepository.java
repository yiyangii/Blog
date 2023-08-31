package com.mercury.BlogSystemCommunity.dao;

import com.mercury.BlogSystemCommunity.bean.BlogPostCommunity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogPostCommunityRepository extends JpaRepository<BlogPostCommunity, Long> {
    void deleteByCommunityId(Long id);

    void deleteBypostId(Long postId);

    List<BlogPostCommunity> findAllByPostId(Long postId);
}
