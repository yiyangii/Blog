package com.mercury.BlogSystemFollow.controller;

import com.mercury.BlogSystemFollow.bean.BlogUserFollower;
import com.mercury.BlogSystemFollow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    // Create
    @PostMapping("/create")
    public ResponseEntity<BlogUserFollower> createFollow(@RequestBody BlogUserFollower blogUserFollower) {
        BlogUserFollower newFollow = followService.createFollow(blogUserFollower);
        return ResponseEntity.ok(newFollow);
    }

    // Read (by ID)
    @GetMapping("/get/{id}")
    public ResponseEntity<BlogUserFollower> getFollowById(@PathVariable Integer id) {
        Optional<BlogUserFollower> follow = followService.getFollowById(id);
        return follow.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Read (All)
    @GetMapping("/getAll")
    public ResponseEntity<List<BlogUserFollower>> getAllFollows() {
        List<BlogUserFollower> follows = followService.getAllFollows();
        return ResponseEntity.ok(follows);
    }

    // Update
    @PutMapping("/update")
    public ResponseEntity<BlogUserFollower> updateFollow(@RequestBody BlogUserFollower blogUserFollower) {
        BlogUserFollower updatedFollow = followService.updateFollow(blogUserFollower);
        return ResponseEntity.ok(updatedFollow);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFollow(@PathVariable Integer id) {
        followService.deleteFollow(id);
        return ResponseEntity.noContent().build();
    }
}
