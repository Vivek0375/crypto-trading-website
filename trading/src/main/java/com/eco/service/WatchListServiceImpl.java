package com.eco.service;

import com.eco.modal.Coin;
import com.eco.modal.User;
import com.eco.modal.WatchList;
import com.eco.repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService {

    @Autowired
    private WatchListRepository watchListRepository;

    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {

        WatchList watchList=watchListRepository.findByUserId(userId);

        if(watchList==null){
            throw new Exception("watchList not found");

        }
        return watchList;
    }

    @Override
    public WatchList createWatchList(User user) {
        WatchList watchList=new WatchList();
        watchList.setUser(user);
        return watchListRepository.save(watchList);
    }

    @Override
    public WatchList findById(Long id) throws Exception {
        Optional<WatchList> watchListOptional=watchListRepository.findById(id);

        if(watchListOptional.isEmpty()){
            throw new Exception("watchList not found");
        }
        return watchListOptional.get();
    }

    @Override
    public Coin addItemToWatchList(Coin coin, User user) throws Exception {
        WatchList watchList=findUserWatchList(user.getId());

        if(watchList.getCoins().contains(coin)){
            watchList.getCoins().remove(coin);

        }
        else watchList.getCoins().add(coin);

        watchListRepository.save(watchList);

        return coin;
    }
}
