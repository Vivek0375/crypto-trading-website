package com.eco.service;

import com.eco.modal.Asset;
import com.eco.modal.Coin;
import com.eco.modal.User;

import java.util.List;

public interface AssetService {

    Asset createAsset(User user, Coin coin,double quantity);

    Asset getAssetById(Long assetId) throws Exception;

    Asset getAssetByUserIdAndId(Long userId,Long assetId);

    List<Asset> getUserAssets(Long userId);

    Asset updateAsset(Long assetId,double quantity) throws Exception;

    Asset findAssetByUserIdAndCoinId(Long userId,String Id);

    void deleteAsset(Long assetId);
}
