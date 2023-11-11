package com.mercury.BlogSystemPost.bean;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "blog_tag", schema = "post_service")
public class Tag implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_post_tag_id_seq")
    @SequenceGenerator(name = "blog_post_tag_id_seq", sequenceName = "post_service.blog_post_tag_id_seq", allocationSize = 1)
    private Long id;
    private String tagName;

    private Integer counts;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostTag> postTags = new HashSet<>();
}
