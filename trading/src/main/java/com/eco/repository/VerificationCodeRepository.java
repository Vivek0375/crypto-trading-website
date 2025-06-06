package com.eco.repository;

import com.eco.modal.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  VerificationCodeRepository extends JpaRepository<VerificationCode,Long> {

    public VerificationCode findByUserId(Long userId);

}
