package com.mercury.BlogSystemPost.dao;

import com.mercury.BlogSystemPost.bean.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("SELECT t FROM Tag t ORDER BY t.counts DESC")
    Page<Tag> findTopTags(Pageable pageable);
}
