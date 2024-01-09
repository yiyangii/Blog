package com.mercury.BlogSystemPost.dao;


import com.mercury.BlogSystemPost.bean.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    // Additional queries can be defined here if needed.
}

