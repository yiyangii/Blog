package com.mercury.BlogSystemPost.dao;


import com.mercury.BlogSystemPost.bean.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Long> {
    // Additional queries can be defined here if needed.
    @Modifying
    @Transactional
    void deleteByPostId(Long postId);


}

