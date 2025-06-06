package com.eco.modal;


import com.eco.domain.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private WithdrawalStatus status;

    private long amount;

    @ManyToOne
    private User user;

    private LocalDateTime date=LocalDateTime.now();
}
