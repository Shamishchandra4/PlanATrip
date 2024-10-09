package com.example.TravelEasyBackend.Repository;

import com.example.TravelEasyBackend.Models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepo extends JpaRepository<UserProfile, String> {
    boolean existsByUsername(String username);
}
