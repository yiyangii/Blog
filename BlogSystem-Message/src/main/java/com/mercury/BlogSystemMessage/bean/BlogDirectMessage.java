package com.mercury.BlogSystemMessage.bean;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@Entity
@ToString
@NoArgsConstructor
@Table(name = "blog_direct_message", schema = "message_service")
public class BlogDirectMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_direct_message_seq")
    @SequenceGenerator(name = "blog_direct_message_seq", sequenceName = "blog_direct_message_seq", allocationSize = 1)
    private Long id;

    @ManyToOne  // This sets up the many-to-one relationship
    @JoinColumn(name = "conversation_id")
    private BlogConversation conversation;  // Changed from conversationId

    @Column(name = "sender_id")
    private Long senderId;

    private String content;

    @Column(name = "creation_date")
    private Date creationDate = new Date(System.currentTimeMillis());

    private boolean read;
}

