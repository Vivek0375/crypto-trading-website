package com.eco.modal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double quantity;
    private double buyPrice;

    // ✅ Corrected: Each Asset is linked to one Coin
    @ManyToOne
    private Coin coin;

    // ✅ Assuming each Asset is owned by one User
    @ManyToOne
    private User user;

}


