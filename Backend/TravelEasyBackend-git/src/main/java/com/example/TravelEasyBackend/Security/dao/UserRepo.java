package com.example.TravelEasyBackend.Security.dao;

import com.example.TravelEasyBackend.Security.SecurityModels.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

    User findByUsername(String username);
    boolean existsByUsername(String username);
}