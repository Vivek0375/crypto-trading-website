package com.eco.modal;


import com.eco.domain.OrderStatus;
import com.eco.domain.OrderType;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne // ✅ FIX HERE
    private User user;

    @Column(nullable = false)
    private OrderType orderType;

    @Column(nullable = false)
    private BigDecimal price;

    private LocalDateTime timestamp=LocalDateTime.now();

    @Column(nullable = false)
    private OrderStatus status;

    @OneToOne(mappedBy="order",cascade=CascadeType.ALL)
    private OrderItem orderItem;
}
