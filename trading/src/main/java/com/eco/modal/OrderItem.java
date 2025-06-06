package com.eco.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double quantity;

    @ManyToOne // ✅ Use this, since one Coin can be referenced by many OrderItems
    private Coin coin;

    private double buyPrice;

    private double sellPrice;

    @JsonIgnore
    @OneToOne
    private Order order;
}
