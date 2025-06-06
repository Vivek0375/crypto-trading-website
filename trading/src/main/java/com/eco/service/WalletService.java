package com.eco.service;

import com.eco.modal.Order;
import com.eco.modal.User;
import com.eco.modal.Wallet;
import org.springframework.stereotype.Service;


public interface WalletService {

    Wallet getUserWallet (User user);

    Wallet addBalance(Wallet wallet,Long money);

    Wallet findWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(User sender,Wallet receiverWallet,Long amount) throws Exception;

    Wallet payOrderpayment(Order order, User user) throws Exception;
}
