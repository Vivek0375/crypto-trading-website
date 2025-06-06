package com.eco.service;

import com.eco.domain.OrderType;
import com.eco.modal.Coin;
import com.eco.modal.Order;
import com.eco.modal.OrderItem;
import com.eco.modal.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order>getAllOrderOfUser(Long userId,OrderType orderType,String asstSymbol);

    Order processOrder(Coin coin,double quantity,OrderType orderType,User user) throws Exception;
}
