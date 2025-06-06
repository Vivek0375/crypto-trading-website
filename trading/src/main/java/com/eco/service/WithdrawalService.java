package com.eco.service;

import com.eco.modal.User;
import com.eco.modal.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithWithdrawal(Long amount, User user);

    Withdrawal proceedWithWithdrawal(Long withdrawalId,boolean accept) throws Exception;

    List<Withdrawal>getUserWithdrawalHistory(User user);

    List<Withdrawal>getAllWithdrawalRequest();
}
