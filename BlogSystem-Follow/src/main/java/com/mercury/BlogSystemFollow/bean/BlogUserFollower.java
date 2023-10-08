package com.mercury.BlogSystemFollow.bean;

import lombok.Data;
import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
@Table(name = "blog_user_followers", schema = "follow_service")
public class BlogUserFollower implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_seq_generator")
    @SequenceGenerator(name = "role_id_seq_generator", sequenceName = "blog_user_followers_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "follower_id", nullable = false)
    private Integer followerId;

    @Column(name = "followed_id", nullable = false)
    private Integer followedId;

    @Column(name = "follow_date")
    private Date followDate;

    public BlogUserFollower() {
    }

    public BlogUserFollower(Integer id, Integer followerId, Integer followedId, Date followDate) {
        this.id = id;
        this.followerId = followerId;
        this.followedId = followedId;
        this.followDate = followDate;
    }
}
