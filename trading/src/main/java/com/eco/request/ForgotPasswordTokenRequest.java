package com.eco.request;

import com.eco.domain.verificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {

    private  String sendTo;
    private verificationType verificationtype;
}
