package com.eco.service;

import com.eco.modal.TwoFactorAuth;
import com.eco.modal.TwoFactorOTP;
import com.eco.modal.User;

public interface TwoFactorOtpService {

    TwoFactorOTP createTwofactorOtp(User user,String otp,String jwt);

    TwoFactorOTP findById(String id);

    TwoFactorOTP findByUser(Long userId);

    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP,String otp );

    void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP);

}
