package com.mercury.BlogSystemCommunity.controller;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogUserCommunity;
import com.mercury.BlogSystemCommunity.service.CommunityService;
import jakarta.ws.rs.core.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @PostMapping("/create")
    public ResponseEntity<BlogCommunity> createCommunity(@RequestBody BlogCommunity community) {
        System.out.println(community);
        BlogCommunity newCommunity = communityService.createCommunity(community);
        return new ResponseEntity<>(newCommunity, HttpStatus.CREATED);
    }

    @PostMapping("/follow")
    public ResponseEntity<String> followCommunity(@RequestBody BlogUserCommunity blogUserCommunity) {
        String message = communityService.followCommunity(blogUserCommunity.getUserId(), blogUserCommunity.getCommunityId());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollowCommunity(@RequestBody Long userId, @RequestBody Long communityId) {
        String message = communityService.unfollowCommunity(userId, communityId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 删除社群
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCommunity(@PathVariable Long id) {
        communityService.deleteCommunity(id);
        return new ResponseEntity<>("Community deleted successfully", HttpStatus.OK);
    }
}

