package com.eco.repository;

import com.eco.modal.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList,Long> {

    WatchList findByUserId(Long userId);

}
