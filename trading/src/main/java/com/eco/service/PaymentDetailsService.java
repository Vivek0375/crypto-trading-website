package com.eco.service;

import com.eco.modal.PaymentDetails;
import com.eco.modal.User;

public interface PaymentDetailsService {

    PaymentDetails addPaymentDetails(
            String accountNumber,
            String accountHolderName,
            String ifsc,
            String bankName,
            User user
    );

    PaymentDetails getUserPaymentDetails(User user);
}