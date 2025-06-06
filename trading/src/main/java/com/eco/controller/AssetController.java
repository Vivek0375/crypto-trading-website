package com.eco.controller;


import com.eco.modal.Asset;
import com.eco.modal.User;
import com.eco.service.AssetService;
import com.eco.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(
            @PathVariable String coinId,
            @RequestHeader("Authorization")String jwt
    ) throws Exception{
        User user=userService.findUserProfileByJwt(jwt);

        Asset asset=assetService.findAssetByUserIdAndCoinId(user.getId(),coinId);

        return ResponseEntity.ok().body(asset);

    }
    @GetMapping()
    public  ResponseEntity<List<Asset>> getAssetsForUser(
            @RequestHeader("Authorization")String jwt
    )throws Exception{

        User user=userService.findUserProfileByJwt(jwt);

        List<Asset> assets=assetService.getUserAssets(user.getId());

        return ResponseEntity.ok().body(assets);
    }

}
