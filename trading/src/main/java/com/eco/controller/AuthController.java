package com.eco.controller;

import com.eco.config.JwtProvider;
import com.eco.modal.TwoFactorOTP;
import com.eco.modal.User;
import com.eco.repository.UserRepository;
import com.eco.response.AuthResponse;
import com.eco.service.CustomUserDetailService;
import com.eco.service.EmailService;
import com.eco.service.TwoFactorOtpService;
import com.eco.service.WatchListService;
import com.eco.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WatchListService watchListService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TwoFactorOtpService twoFactorOtpService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {  // Added @RequestBody
 // Added missing field

        User isEmailExist=userRepository.findByEmail(user.getEmail());
        if(isEmailExist!=null){
            throw new Exception("email is already used with another account");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        newUser.setFullName(user.getFullName());
        newUser.setRole(user.getRole()); // Added missing field

        User savedUser = userRepository.save(newUser);

        watchListService.createWatchList(savedUser);


        Authentication auth=new UsernamePasswordAuthenticationToken(user.getEmail()
                ,user.getPassword()

        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt= JwtProvider.generateToken(auth);

        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("register success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {  // Added @RequestBody
        // Added missing field
        String userName=user.getEmail();
        String password=user.getPassword();
        
        Authentication auth=authenticate(userName,password);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt= JwtProvider.generateToken(auth);

        User authUser =userRepository.findByEmail(userName);

        if(user.getTwoFactorAuth().isEnable()){
            AuthResponse res=new AuthResponse();
            res.setMessage("Two factor auth enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp= OtpUtils.generateOTP();

            TwoFactorOTP oldTwoFactorOTP=twoFactorOtpService.findByUser(authUser.getId());

            if(oldTwoFactorOTP!=null){
                twoFactorOtpService.deleteTwoFactorOTP(oldTwoFactorOTP);
            }

            TwoFactorOTP newTwofactorOTP=twoFactorOtpService.createTwofactorOtp(authUser,otp,jwt);

            emailService.sendVerificationOtpEmail(userName,otp);
            res.setSession(newTwofactorOTP.getId());

            return new ResponseEntity<>(res,HttpStatus.ACCEPTED);

        }



        AuthResponse res=new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("login  success");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    private Authentication authenticate(String userName, String password) {
        UserDetails userDetails= customUserDetailService.loadUserByUsername(userName);

        if(userDetails==null){
            throw new BadCredentialsException("invalid password");

        }
        if(!password.equals((userDetails.getPassword()))){
            throw new BadCredentialsException("invalid Password");
        }


        return new UsernamePasswordAuthenticationToken(userDetails,password,userDetails.getAuthorities());
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySigningOtp(
            @PathVariable String otp,
            @RequestParam String id) throws Exception {
        TwoFactorOTP twoFactorOTP =twoFactorOtpService.findById(id);
        if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP,otp)){
            AuthResponse res=new AuthResponse();
            res.setMessage("Two factor Auth verified");

            res.setTwoFactorAuthEnabled(true);
            res.setJwt(twoFactorOTP.getJwt());

            return new ResponseEntity<>(res,HttpStatus.OK);

        }
        throw new Exception("Invalid otp");
    }
}
