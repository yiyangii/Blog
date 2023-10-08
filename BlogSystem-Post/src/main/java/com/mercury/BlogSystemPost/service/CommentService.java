package com.mercury.BlogSystemPost.service;

import com.mercury.BlogSystemPost.bean.Comment;
import com.mercury.BlogSystemPost.bean.Post;
import com.mercury.BlogSystemPost.dao.CommentRepository;
import com.mercury.BlogSystemPost.dao.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public Comment addCommentToPost(int postId, Comment comment) {
        Post post = postRepository.findById((long) postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        comment.setPost(post);
        return commentRepository.save(comment);
    }
}
