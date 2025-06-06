package com.eco.service;

import com.eco.modal.PaymentDetails;
import com.eco.modal.User;
import com.eco.repository.PaymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService{


    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user) {
        PaymentDetails existing = paymentDetailsRepository.findByUserId(user.getId());

        if (existing != null) {
            // You can either update the existing entry or throw an exception
            // Let's assume you want to update the existing entry:

            existing.setAccountNumber(accountNumber);
            existing.setAccountHolderName(accountHolderName);
            existing.setIfcs(ifsc);
            existing.setBankName(bankName);
            return paymentDetailsRepository.save(existing);
        }

        // Create new if not found
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setIfcs(ifsc);
        paymentDetails.setBankName(bankName);
        paymentDetails.setUser(user);

        return paymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {
        return paymentDetailsRepository.findByUserId(user.getId());
    }
}
