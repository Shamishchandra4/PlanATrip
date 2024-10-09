package com.example.TravelEasyBackend.Service;

import com.example.TravelEasyBackend.Models.UserProfile;
import com.example.TravelEasyBackend.Models.UserReturnModel;
import com.example.TravelEasyBackend.Repository.UserProfileRepo;
import com.example.TravelEasyBackend.Security.SecurityModels.User;
import com.example.TravelEasyBackend.Security.dao.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    @Autowired
    private UserProfileRepo profileRepo;
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public ResponseEntity<User> saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        if(repo.existsByUsername(user.getUsername())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        UserProfile up  = new UserProfile();
        up.setUsername(user.getUsername());
        repo.save(user);
        profileRepo.save(up);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public UserReturnModel constructProfile(String jwt, User user) {
        String username = user.getUsername();
        UserProfile compU = profileRepo.findById(username).orElse(new UserProfile());
        UserReturnModel m = new UserReturnModel(compU);
        m.setJwt(jwt);
        return m;
    }

    public ResponseEntity<UserProfile> saveUserProfile(UserProfile userProfile) {
        if(profileRepo.existsByUsername(userProfile.getUsername())){
            profileRepo.save(userProfile);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
