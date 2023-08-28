package com.mercury.BlogSystemProject.dao;

import com.mercury.BlogSystemProject.bean.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByPostId(Long postId);
    @Modifying
    @Transactional
    void deleteByPostId(Long postId);


}