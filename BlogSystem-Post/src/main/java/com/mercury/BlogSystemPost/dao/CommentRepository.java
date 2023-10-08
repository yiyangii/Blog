package com.mercury.BlogSystemPost.dao;

import com.mercury.BlogSystemPost.bean.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
