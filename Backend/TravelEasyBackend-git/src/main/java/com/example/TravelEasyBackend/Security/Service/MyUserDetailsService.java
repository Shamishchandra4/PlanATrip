package com.example.TravelEasyBackend.Security.Service;

import com.example.TravelEasyBackend.Security.SecurityModels.User;
import com.example.TravelEasyBackend.Security.SecurityModels.UserPrincipal;
import com.example.TravelEasyBackend.Security.dao.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user= repo.findByUsername(username);

        if (user==null) {
            throw new UsernameNotFoundException("User 404");
        }
        return new UserPrincipal(user);
    }

}
