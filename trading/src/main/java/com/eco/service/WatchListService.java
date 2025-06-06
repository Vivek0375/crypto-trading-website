package com.eco.service;

import com.eco.modal.Coin;
import com.eco.modal.User;
import com.eco.modal.WatchList;

public interface WatchListService {

    WatchList findUserWatchList(Long userId) throws Exception;

    WatchList createWatchList(User user);

    WatchList findById(Long id) throws Exception;

    Coin addItemToWatchList(Coin coin,User user) throws Exception;

}
