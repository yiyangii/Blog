package com.mercury.BlogSystemMessage.bean;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Data
@Entity
@ToString
@NoArgsConstructor
@Table(name = "blog_conversation", schema = "message_service")
public class BlogConversation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_conversation_seq")
    @SequenceGenerator(name = "blog_conversation_seq", sequenceName = "blog_conversation_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user1_id")
    private Long user1Id;

    @Column(name = "user2_id")
    private Long user2Id;

    @OneToMany(mappedBy = "conversation")
    private List<BlogDirectMessage> messages;
}

