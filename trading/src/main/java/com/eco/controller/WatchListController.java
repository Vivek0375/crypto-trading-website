package com.eco.controller;


import com.eco.modal.Coin;
import com.eco.modal.User;
import com.eco.modal.WatchList;
import com.eco.repository.WatchListRepository;
import com.eco.service.CoinService;
import com.eco.service.UserService;
import com.eco.service.WatchListService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListRepository watchListRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @Autowired
    private WatchListService  watchListService;

    @GetMapping("/user")
    public ResponseEntity<WatchList> getUserWatchList(
            @RequestHeader("Authorization") String jwt)
           throws Exception{

        User user= userService.findUserProfileByJwt(jwt);

        WatchList watchList= watchListService.findUserWatchList(user.getId());

        return ResponseEntity.ok(watchList);

    }

    @GetMapping("/{watchListId}")
    public ResponseEntity<WatchList> getWatchListById(
            @PathVariable Long watchListId) throws Exception {

        WatchList watchList=watchListService.findById(watchListId);

        return ResponseEntity.ok(watchList);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchList(
            @RequestHeader("Authorization")String jwt,
            @PathVariable String coinId) throws Exception{

        User user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(coinId);
        Coin addedCoin=watchListService.addItemToWatchList(coin,user);

        return ResponseEntity.ok(addedCoin);
    }


}
