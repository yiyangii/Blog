package com.mercury.BlogSystemCommunity.bean;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(schema = "community_service", name = "blog_post_community")
public class BlogPostCommunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long postId;
    private Long communityId;




    // Standard getters and setters
}