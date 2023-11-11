package com.mercury.BlogSystemPost.dao;

import com.mercury.BlogSystemPost.bean.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    void deleteByAuthorId(Long authorId);

    List<Post> findByAuthorId(Long userId);


}
