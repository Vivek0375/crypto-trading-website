package com.eco.service;

import com.eco.domain.verificationType;
import com.eco.modal.ForgotPasswordToken;
import com.eco.modal.User;
import com.eco.repository.ForgotPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordImpl implements ForgotPasswordService {

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public ForgotPasswordToken createToken(User user,
                                           String id,
                                           String otp,
                                           verificationType verificationtype,
                                           String sendTo) {

        ForgotPasswordToken token =new ForgotPasswordToken();

        token.setUser(user);
        token.setSendTo(sendTo);
        token.setVerificationtype(verificationtype);
        token.setOtp(otp);
        token.setId(id);

        return forgotPasswordRepository.save(token);
    }

    @Override
    public ForgotPasswordToken findById(String id) {
        Optional<ForgotPasswordToken> token =forgotPasswordRepository.findById(id);

        return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUser(Long userId) {

        return forgotPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {

        forgotPasswordRepository.delete(token);
    }
}
