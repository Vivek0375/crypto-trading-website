package com.eco.controller;

import com.eco.request.ForgotPasswordTokenRequest;
import com.eco.domain.verificationType;
import com.eco.modal.ForgotPasswordToken;
import com.eco.modal.User;
import com.eco.modal.VerificationCode;
import com.eco.request.ResetPasswordRequest;
import com.eco.response.ApiResponse;
import com.eco.response.AuthResponse;
import com.eco.service.EmailService;
import com.eco.service.UserService;
import com.eco.service.VerificationCodeService;
import com.eco.service.ForgotPasswordService;
import com.eco.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerification(
            @RequestHeader("Authorization") String jwt,
            @PathVariable verificationType verificationtype) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        if (verificationCode == null) {
            verificationCode = verificationCodeService
                    .sendVerificationCode(user, verificationtype);
        }

        if (verificationtype.equals(verificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
        }


        return new ResponseEntity<>("verification otp send successfully", HttpStatus.OK);
    }


    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationtype().equals(verificationType.EMAIL) ?
                verificationCode.getEmail() : verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);

        if (isVerified) {
            User updatedUser = userService.enableTwoFactorAuthentication(
                    verificationCode.getVerificationtype(), sendTo, user);

            verificationCodeService.deleteVerificationCodeById(verificationCode);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        throw new Exception("Wrong Otp");
    }


    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(

            @RequestBody ForgotPasswordTokenRequest req) throws Exception {

        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOTP();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());

        if (token == null) {
            token = forgotPasswordService.createToken(user, id, otp, req.getVerificationtype(), req.getSendTo());
        }

        AuthResponse response = new AuthResponse();

        if (req.getVerificationtype().equals(verificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(
                    user.getEmail(),
                    token.getOtp()
            );


            response.setSession(token.getId());
            response.setMessage("Password reset otp sent successfully");
        }


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {

        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
        boolean isVerifiesd = forgotPasswordToken.getOtp().equals(req.getOtp());


        if (isVerifiesd) {
            userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());

            ApiResponse res = new ApiResponse();
            res.setMessage("password updated Successfully");
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }
        throw new Exception("Invalid OTP");
    }

}
