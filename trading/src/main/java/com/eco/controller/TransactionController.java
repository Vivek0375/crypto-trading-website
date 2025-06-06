package com.eco.controller;


import com.eco.modal.PaymentDetails;
import com.eco.modal.User;
import com.eco.service.PaymentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
    @RequestMapping("/api/transactions")
    public class TransactionController {

        @Autowired
        private PaymentDetailsService paymentDetailsService;

        // For now, we're fetching payment details of a specific user
        // You can get the user from session, JWT, or pass as request body for demo

        @GetMapping("/payment-details/{userId}")
        public PaymentDetails getUserPaymentDetails(@PathVariable Long userId) {
            // This is mock user creation; ideally, you'd fetch this from DB or auth context
            User user = new User();
            user.setId(userId);

            return paymentDetailsService.getUserPaymentDetails(user);
        }
    }
