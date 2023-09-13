package com.mercury.BlogSystemMessage.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@ToString
@NoArgsConstructor
@Table(name = "blog_direct_message", schema = "message_service")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class BlogDirectMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_direct_message_seq")
    @SequenceGenerator(name = "blog_direct_message_seq", sequenceName = "blog_direct_message_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "conversation_id")
    private BlogConversation conversation;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "receiver_id")
    private Long receiverId;

    private String content;

    @Column(name = "creation_date")
    private Date creationDate = new Date(System.currentTimeMillis());

    private boolean read;

    @Transient
    private Long transientConversationId;
}

