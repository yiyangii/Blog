package com.mercury.BlogSystemUser.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@Entity
@Table(name = "user_role", schema = "user_service")
@NoArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_role_id_seq_generator")
    @SequenceGenerator(name = "user_role_id_seq_generator", sequenceName = "user_service.user_role_id_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    @Setter
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @EqualsAndHashCode.Include
    private Role role;



}
