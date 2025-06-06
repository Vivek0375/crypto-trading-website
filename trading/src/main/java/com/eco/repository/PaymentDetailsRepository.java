package com.eco.repository;

import com.eco.modal.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  PaymentDetailsRepository  extends JpaRepository<PaymentDetails,Long> {

    PaymentDetails findByUserId(Long userId);
}
