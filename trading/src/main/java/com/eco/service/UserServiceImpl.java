package com.eco.service;

import com.eco.config.JwtProvider;
import com.eco.domain.verificationType;
import com.eco.modal.TwoFactorAuth;
import com.eco.modal.User;
import com.eco.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {

        String email= JwtProvider.getEmailFromToken(jwt);
        User user =userRepository.findByEmail(email);

        if(user==null){
            throw new Exception("user not found");

        }
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user =userRepository.findByEmail(email);

        if(user==null){
            throw new Exception("user not found");

        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User>user=userRepository.findById(userId);
        if(user.isEmpty()){
            throw  new Exception("user not found");

        }
        return user.get();
    }

    @Override
    public User enableTwoFactorAuthentication(verificationType verificationtype, String sendTo, User user) {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnable(true);
        twoFactorAuth.setSendTo(verificationtype);

        user.setTwoFactorAuth(twoFactorAuth);

        return userRepository.save(user);
    }


    @Override
    public User updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        return userRepository.save(user);
    }
}
