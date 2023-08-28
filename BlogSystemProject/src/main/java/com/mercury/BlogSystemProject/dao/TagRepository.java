package com.mercury.BlogSystemProject.dao;

import com.mercury.BlogSystemProject.bean.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    // Additional queries can be defined here if needed.
}
