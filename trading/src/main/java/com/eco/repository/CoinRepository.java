package com.eco.repository;

import com.eco.modal.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository  extends JpaRepository<Coin,String> {
}
