package com.mercury.BlogSystemPost.bean;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "blog_post", schema = "post_service")
@Data
@NoArgsConstructor
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_post_id_seq")
    @SequenceGenerator(name = "blog_post_id_seq", sequenceName = "post_service.blog_post_id_seq", allocationSize = 1)
    private int id;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;
    @Column(name = "featuredimage")
    private String featuredImage;
    @Column(name = "route")
    private String Route;

    @Column(name = "commentcount")
    private int commentCount;
    @Column(name = "viewedcount")
    private int viewdCount;
    @Column(name = "readingtime")
    private int readingTime;


    @Column(name = "author_id")
    private int authorId;

    private Date updatedAt;

    @Column(name = "created_at", updatable = false)
    private Date createdAt = new Date(System.currentTimeMillis());

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PostTag> postTags = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<PostCategory> postCategories = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Comment> comments = new HashSet<>();
}

