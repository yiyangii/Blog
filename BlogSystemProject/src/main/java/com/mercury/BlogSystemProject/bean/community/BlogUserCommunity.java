package com.mercury.BlogSystemProject.bean.community;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(schema = "community_service", name = "blog_user_community")
public class BlogUserCommunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long communityId;

}
