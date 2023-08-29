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
        BlogCommunity newCommunity = communityService.createCommunity(community);
        return new ResponseEntity<>(newCommunity, HttpStatus.CREATED);
    }

    @PostMapping("/follow")
    public ResponseEntity<String> followCommunity(@RequestBody BlogUserCommunity blogUserCommunity) {
        String message = communityService.followCommunity(blogUserCommunity.getUserId(), blogUserCommunity.getCommunityId());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}

