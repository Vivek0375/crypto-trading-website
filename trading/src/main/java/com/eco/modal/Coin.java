package com.eco.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Coin {

        @Id
        @JsonProperty("id")
        private String id;

        @JsonProperty("symbol")
        private String symbol;

        @JsonProperty("name")
        private String name;

        @JsonProperty("image")
        private String image;

        @JsonProperty("current_price")
        private double currentPrice;

        @JsonProperty("market_cap")
        private long marketCap;

        @JsonProperty("market_cap_rank")
        private int marketCapRank;

        @JsonProperty("fully_diluted_valuation")
        private long fullyDilutedValuation;

        @JsonProperty("total_volume")
        private long totalVolume;

        @JsonProperty("high_24h")
        private double high24h;

        @JsonProperty("low_24h")
        private double low24h;

        @JsonProperty("price_change_24h")
        private double priceChange24h;  // Fixed field name to match JSON property

        @JsonProperty("price_change_percentage_24h")
        private double priceChangePercentage24h;  // Added missing field

        @JsonProperty("market_cap_change_24h")
        private long marketCapChange24h;

        @JsonProperty("market_cap_change_percentage_24h")
        private double marketCapChangePercentage24h;

        @JsonProperty("circulating_supply")
        private long circulatingSupply;

        @JsonProperty("total_supply")
        private long totalSupply;

        @JsonProperty("max_supply")
        private long maxSupply;

        @JsonProperty("ath")
        private double ath;

        @JsonProperty("ath_change_percentage")
        private double athChangePercentage;  // Fixed field name

        @JsonProperty("ath_date")
        private Date athDate;

        @JsonProperty("atl")
        private double atl;

        @JsonProperty("atl_change_percentage")
        private double atlChangePercentage;

        @JsonProperty("atl_date")
        private Date atlDate;

        @JsonIgnore
        private String roi;  // Removed redundant @JsonProperty since it's ignored

        @JsonProperty("last_updated")
        private Date lastUpdated;
}