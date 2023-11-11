package com.mercury.BlogSystemCommunity.dao;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlogCommunityRepository extends JpaRepository<BlogCommunity, Long> {
    void deleteById(Long id);

    void deleteBycommunityCreator(Long communityCreator);

    @Query("SELECT bc.id FROM BlogCommunity bc WHERE bc.communityName = :communityName")
    Long getCommunityIdBycommunityName(String communityName);

    @Query("SELECT bc FROM BlogCommunity bc ORDER BY bc.follow DESC")
    Page<BlogCommunity> findTopCommunities(Pageable pageable);

    List<BlogCommunity> findAllBycommunityCreator(Long communityCreator);
}
