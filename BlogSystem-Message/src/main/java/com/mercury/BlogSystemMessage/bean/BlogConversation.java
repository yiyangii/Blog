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
public class BlogConversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "conversation_id")
    private int conversationId;

    @Column(name = "sender_id")
    private int senderId;

    private String content;

    @Column(name = "creation_date")
    private Date creationDate = new Date(System.currentTimeMillis());

    private boolean read;

}
