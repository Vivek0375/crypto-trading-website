package com.eco.controller;


import com.eco.modal.PaymentDetails;
import com.eco.modal.User;
import com.eco.service.PaymentDetailsService;
import com.eco.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentDetailsController {
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @PostMapping("/payment-details")
    public ResponseEntity<PaymentDetails> addPaymentDetails(
            @RequestBody PaymentDetails paymentDetailsRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        PaymentDetails paymentDetails = paymentDetailsService.addPaymentDetails(  // Changed to lowercase service reference
                paymentDetailsRequest.getAccountNumber(),
                paymentDetailsRequest.getAccountHolderName(),
                paymentDetailsRequest.getIfcs(),  // Fixed typo: ifcs -> ifsc
                paymentDetailsRequest.getBankName(),
                user
        );

        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }

    @GetMapping("/payment-details")
    public ResponseEntity<PaymentDetails> getUsersPaymentDetails (

            @RequestHeader("Authorization")String jwt
    ) throws Exception{

        User user= userService.findUserProfileByJwt(jwt);

        PaymentDetails paymentDetails=paymentDetailsService.getUserPaymentDetails(user);

        return new ResponseEntity<>(paymentDetails,HttpStatus.CREATED);
    }
}
