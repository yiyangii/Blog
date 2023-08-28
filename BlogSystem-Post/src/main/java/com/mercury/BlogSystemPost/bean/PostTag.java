package com.mercury.BlogSystemPost.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@Entity
@Table(name = "blog_post_tag", schema = "post_service")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PostTag implements Serializable {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @EqualsAndHashCode.Include
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
