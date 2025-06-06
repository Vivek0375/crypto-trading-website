package com.eco.service;

import com.eco.domain.verificationType;
import com.eco.modal.ForgotPasswordToken;
import com.eco.modal.User;

public interface ForgotPasswordService {

    ForgotPasswordToken  createToken (User user,
                                      String id, String otp,
                                      verificationType verificationtype,
                                      String sendTo);

    ForgotPasswordToken findById(String id);
    ForgotPasswordToken findByUser (Long userId);

    void deleteToken(ForgotPasswordToken token);
}
