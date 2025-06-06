package com.eco.service;

import com.eco.domain.verificationType;
import com.eco.modal.User;
import com.eco.modal.VerificationCode;
import com.eco.repository.VerificationCodeRepository;
import com.eco.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{


    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Override
    public VerificationCode sendVerificationCode(User user , verificationType verififcationtype) {

        VerificationCode verificationCode1= new VerificationCode();
        verificationCode1.setOtp(OtpUtils.generateOTP());
        verificationCode1.setVerificationtype(verififcationtype);
        verificationCode1.setUser(user);


        return verificationCodeRepository.save(verificationCode1);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
        Optional<VerificationCode> verificationCode=
                verificationCodeRepository.findById(id);
        if(verificationCode.isPresent()){
            return  verificationCode.get();
        }

        throw  new Exception("verification code not found");

    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userId) {
        return verificationCodeRepository.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCodeById(VerificationCode verificationCode) {
        verificationCodeRepository.delete(verificationCode);
    }
}
