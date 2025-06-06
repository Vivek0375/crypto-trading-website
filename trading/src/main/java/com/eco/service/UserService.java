package com.eco.service;

import com.eco.domain.verificationType;
import com.eco.modal.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public User findUserProfileByJwt(String jwt) throws Exception;
    public  User findUserByEmail(String email) throws Exception;
    public User findUserById(Long userId) throws Exception;

    public User enableTwoFactorAuthentication(
            verificationType verificationtype,
            String sendTo,
            User user);

    User updatePassword(User user,String newPassword);

}
