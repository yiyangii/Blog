package com.mercury.BlogSystemFollow.dao;

import com.mercury.BlogSystemFollow.bean.BlogUserFollower;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowerRepository extends JpaRepository<BlogUserFollower,Long> {

 

    List<BlogUserFollower> findByFollowerId(Integer userId);

    List<BlogUserFollower> findByFollowedId(Integer userId);
}
