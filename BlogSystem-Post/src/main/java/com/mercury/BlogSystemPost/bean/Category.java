package com.mercury.BlogSystemPost.bean;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blog_category", schema = "post_service")
@Data
@ToString
@NoArgsConstructor
public class Category implements Serializable {
    /**
     * export interface TaxonomyType {
     *   id: string | number;
     *   name: string;
     *   href: Route;
     *   count?: number;
     *   thumbnail?: string;
     *   desc?: string;
     *   color?: TwMainColor | string;
     *   taxonomy: "category" | "tag";
     * }
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq_gen")
    @SequenceGenerator(name = "category_seq_gen", sequenceName = "post_service.category_id_seq", allocationSize = 1)
    private Long id;

    private String name;
    private int count;
    private String description;
    private String thumbnail;
    private String color;
    private String href;


    @Enumerated(EnumType.STRING)
    private Taxonomy taxonomy = Taxonomy.CATEGORY;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PostCategory> postCategories = new HashSet<>();

    public enum Taxonomy {
        CATEGORY, TAG
    }
}