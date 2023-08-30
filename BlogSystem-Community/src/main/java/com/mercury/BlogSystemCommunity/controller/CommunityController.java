package com.mercury.BlogSystemCommunity.controller;

import com.mercury.BlogSystemCommunity.bean.BlogCommunity;
import com.mercury.BlogSystemCommunity.bean.BlogUserCommunity;
import com.mercury.BlogSystemCommunity.service.CommunityService;
import jakarta.ws.rs.core.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @PostMapping("/create")
    public ResponseEntity<BlogCommunity> createCommunity(@RequestBody BlogCommunity community) {
        BlogCommunity newCommunity = communityService.createCommunity(community);
        return new ResponseEntity<>(newCommunity, HttpStatus.CREATED);
    }

    @PostMapping("/follow")
    public ResponseEntity<String> followCommunity(@RequestBody BlogUserCommunity blogUserCommunity) {
        String message = communityService.followCommunity(blogUserCommunity.getUserId(), blogUserCommunity.getCommunityId());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollowCommunity(@RequestBody Map<String, Long> body) {
        Long userId = body.get("userId");
        Long communityId = body.get("communityId");
        String message = communityService.unfollowCommunity(userId, communityId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    // 删除社群
    @DeleteMapping("/delete/{communityId}")
    public ResponseEntity<String> deleteCommunity(@PathVariable Long communityId, @RequestBody Map<String, Long> body) {
        Long userId = body.get("userId");
        System.out.println(userId);
        System.out.println(communityId);
        String message = communityService.deleteCommunity(communityId, userId);

        if ("Deleted community successfully".equals(message)) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else if ("You are not authorized to delete this community".equals(message) || "Community not found".equals(message)) {
            return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>("Unknown error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

