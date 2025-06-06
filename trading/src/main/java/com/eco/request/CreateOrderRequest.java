package com.eco.request;


import com.eco.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {

    private String coinId;
    private double quantity;
    private OrderType orderType;
}
