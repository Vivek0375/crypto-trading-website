package com.eco.service;

import com.eco.domain.OrderType;
import com.eco.modal.Order;
import com.eco.modal.User;
import com.eco.modal.Wallet;
import com.eco.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements  WalletService{

   @Autowired
   private WalletRepository walletRepository;


    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet= walletRepository.findByUserId(user.getId());

        if(wallet==null){
            wallet=new Wallet();
            wallet.setUser(user);
            walletRepository.save(wallet);
        }

        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(money));

        wallet.setBalance(newBalance);
        return walletRepository.save(wallet);  // Changed to save the wallet object
    }

    @Override
    public Wallet findWalletById(Long id) throws Exception {

        Optional<Wallet> wallet=walletRepository.findById(id);
        if(wallet.isPresent()){
            return wallet.get();
        }

        throw new Exception("wallet not found");
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception {
        Wallet senderWallet=getUserWallet(sender);

        if(senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount))<0){
            throw new Exception("InSufficient Balance..");

        }
        BigDecimal senderBalance=senderWallet
                .getBalance()
                .subtract(BigDecimal.valueOf(amount));

        senderWallet.setBalance(senderBalance);

        walletRepository.save(senderWallet);

        BigDecimal receiverBalance=receiverWallet
                .getBalance().add(BigDecimal.valueOf(amount));

        receiverWallet.setBalance(receiverBalance);

        walletRepository.save(receiverWallet);

        return senderWallet;
    }

    @Override
    public Wallet payOrderpayment(Order order, User user) throws Exception {
        Wallet wallet =getUserWallet(user);
        if(order.getOrderType().equals(OrderType.BUY)){
            BigDecimal newBalance =wallet.getBalance().subtract(order.getPrice());

            if(newBalance.compareTo(order.getPrice())<0){
                throw new Exception("Insufficient funds for this transaction");

            }
            wallet.setBalance(newBalance);
        }
        else{
            BigDecimal newBalance=wallet.getBalance().add(order.getPrice());
            wallet.setBalance(newBalance);
        }
        walletRepository.save(wallet);
        return wallet;
    }
}
