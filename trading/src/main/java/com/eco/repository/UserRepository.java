package com.eco.repository;

import com.eco.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  UserRepository extends JpaRepository<User,Long> {

     User findByEmail(String email);
}
