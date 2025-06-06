package com.eco.controller;


import com.eco.domain.OrderType;
import com.eco.modal.Coin;
import com.eco.modal.Order;
import com.eco.modal.User;
import com.eco.modal.WalletTransaction;
import com.eco.request.CreateOrderRequest;
import com.eco.service.CoinService;
import com.eco.service.OrderService;
import com.eco.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;

    @PostMapping("/pay")
    public ResponseEntity<Order>payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderRequest req
    )throws Exception{
        User user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(req.getCoinId());

        Order order =orderService.processOrder(coin,req.getQuantity(),req.getOrderType(),user);

        return ResponseEntity.ok(order);
    }


    @PostMapping("/{orderId}")
    public ResponseEntity<Order>getOrderId(
            @RequestHeader("Authorization") String jwtToken,
            @PathVariable Long orderId
    )throws Exception{


        User user=userService.findUserProfileByJwt(jwtToken);

        Order order=orderService.getOrderById(orderId);

        if(order.getUser().getId().equals(user.getId())){
            return ResponseEntity.ok(order);
        }
        else{
            throw  new Exception("You don't have access");
        }

    }

    @GetMapping()
    public ResponseEntity<List<Order>> gtAllOrderForUser(
            @RequestHeader("Authorization")String jwt,
            @RequestParam(required=false)OrderType orderType,
            @RequestParam(required = false) String asset_symbol
            ) throws Exception{

        Long userId=userService.findUserProfileByJwt(jwt).getId();


        List<Order> userOrder=orderService.getAllOrderOfUser(userId,orderType,asset_symbol);

        return ResponseEntity.ok(userOrder);



    }


}
