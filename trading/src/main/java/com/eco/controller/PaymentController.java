package com.eco.controller;

import com.eco.domain.PaymentMethod;
import com.eco.modal.PaymentOrder;
import com.eco.modal.User;
import com.eco.response.PaymentResponse;
import com.eco.service.PaymentService;
import com.eco.service.UserService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long amount,
            @PathVariable PaymentMethod paymentMethod) throws Exception ,
            RazorpayException,
            StripeException {

        User user = userService.findUserProfileByJwt(jwt);
        PaymentResponse paymentResponse;

        PaymentOrder order=paymentService.createOrder(user,amount,paymentMethod);

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            paymentResponse=paymentService.createRazorPaymentLink(user,amount,order.getId());
        }
        else{
            paymentResponse=paymentService.createStripePaymentLink(user,amount, order.getAmount());


        }

        return  new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);


    }
}