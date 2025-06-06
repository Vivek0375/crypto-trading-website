package com.eco.modal;


import com.eco.domain.verificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String  id;

    @OneToOne
    private  User user;

    private String otp;

    private verificationType verificationtype;

    private  String sendTo;

}
