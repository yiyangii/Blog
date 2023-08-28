package com.mercury.BlogSystemUser.bean;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
@Table(name = "users", schema = "user_service")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_id_seq_generator")
    @SequenceGenerator(name = "users_id_seq_generator", sequenceName = "user_service.users_id_seq", allocationSize = 1)
    private long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String bio;

    @Column(name = "registration_date")
    private Date registrationDate;

    public User(int id, String username, String email, String password, String bio, Date registrationDate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.registrationDate = new Date(System.currentTimeMillis());
    }

    public User() {
    }
}
