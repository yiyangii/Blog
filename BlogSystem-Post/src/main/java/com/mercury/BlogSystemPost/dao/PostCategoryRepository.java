package com.mercury.BlogSystemPost.dao;

import com.mercury.BlogSystemPost.bean.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public interface PostCategoryRepository extends JpaRepository<PostCategory, Integer> {
    // For instance, to find all PostCategories by a Post ID
    // List<PostCategory> findByPostId(Integer postId);
    @Modifying
    @Transactional
    void deleteByPostId(Long postId);


    List<PostCategory> findByCategoryId(int categoryId);
}
