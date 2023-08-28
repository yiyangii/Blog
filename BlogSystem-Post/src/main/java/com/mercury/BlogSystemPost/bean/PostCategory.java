package com.mercury.BlogSystemPost.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Entity
@ToString
@Table(name = "blog_post_category", schema = "post_service")
@Data
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PostCategory implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private int id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore
    @Setter
    private Post post;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Include
    private Category category;

    @Override
    public String toString() {
        return "PostCategory{" +
                "id=" + id +
                ", category=" + category +
                '}';
    }

}
