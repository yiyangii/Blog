package com.mercury.BlogSystemProject.dao;

import com.mercury.BlogSystemProject.bean.Post;
import com.mercury.BlogSystemProject.bean.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    void deleteByAuthorId(Long authorId);

}
