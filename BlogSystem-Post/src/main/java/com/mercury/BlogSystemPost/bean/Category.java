package com.mercury.BlogSystemPost.bean;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@ToString
@NoArgsConstructor
@Entity
@Table(name = "blog_category", schema = "post_service")
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostCategory> postCategories = new HashSet<>();
}
