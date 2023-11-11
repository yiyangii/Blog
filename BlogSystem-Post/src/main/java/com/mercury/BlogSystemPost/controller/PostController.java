package com.mercury.BlogSystemPost.controller;



import com.mercury.BlogSystemPost.bean.Post;
import com.mercury.BlogSystemPost.bean.Tag;
import com.mercury.BlogSystemPost.service.PostService;
import com.mercury.BlogSystemPost.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private TagService tagService;
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post savedPost = postService.savePost(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable int id, @RequestBody Post post) {
        if(post.getId() != id) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            Post updatedPost = postService.updatePost(post);
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable int id) {
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    @PostMapping("/community")
    public Post createPostInCommunity(@RequestBody Post post, @RequestParam String communityName) {
        return postService.savePostToCommunity(post, communityName);
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<Post>> getPostsByAuthorId(@PathVariable int authorId) {
        System.out.println(authorId);
        List<Post> posts = postService.getPostsByAuthorId(authorId);
        System.out.println(posts);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }

    /**
     * Tag Controller
     */
    @GetMapping("/tag")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/tag/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        return tagService.getTagById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/tag")
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag) {
        Tag savedTag = tagService.saveTag(tag);
        return ResponseEntity.status(201).body(savedTag);
    }

    @PutMapping("/tag/{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag tag) {
        if (tagService.getTagById(id).isPresent()) {
            tag.setId(id);
            Tag updatedTag = tagService.saveTag(tag);
            return ResponseEntity.ok(updatedTag);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/tag/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        if (tagService.getTagById(id).isPresent()) {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tag/top")
    public ResponseEntity<List<Tag>> getTopTags() {
        List<Tag> topTags = tagService.getTopTags(10);
        if (topTags.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(topTags);
    }

}
