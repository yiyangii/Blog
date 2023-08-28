package com.mercury.BlogSystemPost.bean;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "blog_image",schema = "post_service")
@Data
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Image implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_image_seq_gen")
    @SequenceGenerator(name = "blog_image_seq_gen", sequenceName = "post_service.blog_image_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    private Long id;
    private String url;
    private String altText;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore
    @EqualsAndHashCode.Include
    private Post post;
}