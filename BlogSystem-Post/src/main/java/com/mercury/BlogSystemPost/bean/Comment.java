package com.mercury.BlogSystemPost.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "blog_comment", schema = "post_service")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Comment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String content;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "created_at", updatable = false)
    private Date createdAt = new Date(System.currentTimeMillis());

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    private Post post;
}

