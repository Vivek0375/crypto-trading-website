package com.eco.repository;

import com.eco.modal.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  TwoFactorOtpRepository extends JpaRepository<TwoFactorOTP,String> {

    TwoFactorOTP findByUserId(Long userId);


}
