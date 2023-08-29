package com.mercury.BlogSystemCommunity.bean;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@ToString
@NoArgsConstructor
@Entity
@Table(schema = "community_service", name = "blog_community")
public class BlogCommunity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "community_id_seq")
    @SequenceGenerator(name = "community_id_seq", sequenceName = "community_service.community_id_seq", allocationSize = 1)
    private Long id;
    private String communityName;
    private Long communityCreator;

}
