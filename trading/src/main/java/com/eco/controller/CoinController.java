package com.eco.controller;

import com.eco.modal.Coin;
import com.eco.service.CoinService;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    ResponseEntity<List<Coin>> getCoinList(
            @RequestParam( required = false,
             name="page")int page) throws Exception {
        List<Coin> coins=coinService.getCoinList(page);
        return  new ResponseEntity<>(coins, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{coinId}/chart")
    public ResponseEntity<JsonNode> getMarketChart(
            @PathVariable String coinId,
            @RequestParam("days") int days
    ) throws Exception {
        String res = coinService.getMarketChart(coinId, days);  // Changed method name to match likely service method
        JsonNode jsonNode = objectMapper.readTree(res);  // Fixed ObjectMapper usage
        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);  // Fixed variable name
    }

    @GetMapping("/search")
    public ResponseEntity<JsonNode> searchCoin(
            @RequestParam("q") String keyword
    ) throws Exception {
        String coinData = coinService.searchCoin(keyword);
        JsonNode jsonNode = objectMapper.readTree(coinData);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/top50")
    public ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws Exception {
        String coins = coinService.get50TopCoinsByMarketCapRank();
        JsonNode jsonNode = objectMapper.readTree(coins);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/treading")
    public ResponseEntity<JsonNode> getTreadingCoin() throws Exception {
        String coins = coinService.getTreadingCoins();
        JsonNode jsonNode = objectMapper.readTree(coins);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/details/{coinId}")
    public ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws Exception {
        String coins = coinService.getCoinDetails(coinId);
        JsonNode jsonNode = objectMapper.readTree(coins);
        return ResponseEntity.ok(jsonNode);
    }



}


