package com.eco.service;

import com.eco.domain.verificationType;
import com.eco.modal.User;
import com.eco.modal.VerificationCode;

public interface VerificationCodeService {

    VerificationCode sendVerificationCode (User user, verificationType verificationtype);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeById(VerificationCode verificationCode);

}
