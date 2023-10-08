package com.mercury.BlogSystemPost.controller;

import com.mercury.BlogSystemPost.bean.Comment;
import com.mercury.BlogSystemPost.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/addCommentToPost/{postId}")
    public ResponseEntity<?> addCommentToPost(@PathVariable int postId, @RequestBody Comment comment) {
        try {
            Comment addedComment = commentService.addCommentToPost(postId, comment);
            return new ResponseEntity<>(addedComment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
